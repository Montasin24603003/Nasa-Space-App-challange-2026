// ---- DATA (site/habitat values are approximate model inputs) ----
        const SITES = {jezero: {n: 'Jezero Crater', rad: .95, ice: .55, sol: .9}, gale: {n: 'Gale Crater', rad: 1, ice: .4, sol: .95}, utopia: {n: 'Utopia Planitia', rad: 1, ice: .9, sol: .7}, arcadia: {n: 'Arcadia Planitia', rad: 1.1, ice: .85, sol: .7}, hellas: {n: 'Hellas Basin', rad: .85, ice: .5, sol: .9}};
        const HABS = {surface: {n: 'Surface Module', sh: .10, pw: 90}, regolith: {n: 'Regolith-Covered Habitat', sh: .40, pw: 110}, lava: {n: 'Lava Tube Shelter', sh: .70, pw: 150}};
        // K sources: dose = NASA Curiosity RAD baseline (mSv/sol); o2 = NASA BVAD 0.84 kg/crew/day; h2o = NASA BVAD 4.35 kg/crew/day; limit = NASA-STD-3001 career limit 600 mSv.
        // Everything else (power, plant sizing, start reserves, spike multipliers) is a MODEL ASSUMPTION.
        const K = {dose: .64, o2: .84, h2o: 4.35, crewPw: 12, panel: 320, plant: 5, bat: 3, limit: 600, start: 90, startCrew: 4, tau0: .6};
        // NASA DONKI 2024 solar particle episodes as [day-of-year, tier]
        let SEPSRC = 'NASA DONKI 2024 (bundled snapshot)';
        let SEP = [[2, 2], [22, 1], [29, 2], [37, 1], [40, 2], [43, 3], [75, 2], [83, 2], [130, 3], [134, 2], [160, 3], [164, 2], [205, 3], [213, 1], [218, 1], [245, 1], [249, 1], [253, 2], [261, 2], [283, 3], [300, 2], [326, 3], [343, 1], [353, 1], [356, 1]];
        const MULT = {1: 1, 2: 4, 3: 12}, TIER = {1: 'minor', 2: 'moderate', 3: 'severe'};
        function rng(a) {return () => {a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296}}
        function simulate({site, crew, hab, seed}) {
            const S = SITES[site], H = HABS[hab], R = rng(seed), N = 500, ev = [], log = [], storms = [], sp = {};
            const nr = 2 + Math.floor(R() * 2);
            for (let i = 0; i < nr; i++)storms.push({s: 5 + Math.floor(R() * 470), pk: 2 + R() * 2, g: 0});
            if (R() < .25) storms.push({s: 80 + Math.floor(R() * 270), pk: 5 + R() * 3.5, g: 1});
            for (const w of storms) ev.push({sol: w.s, msg: w.g ? `A planet-encircling dust storm begins, peaking near optical depth ${w.pk.toFixed(1)}.` : `A regional dust storm rolls in, peaking near optical depth ${w.pk.toFixed(1)}.`, k: 'dust'});
            const tau = t => {let m = K.tau0; for (const w of storms) {const d = t - w.s; if (d < 0) continue; const f = d < 12 ? d / 12 : d < 33 ? 1 : Math.exp(-(d - 33) / 43); m = Math.max(m, K.tau0 + (w.pk - K.tau0) * f)} return m};
            const off = Math.floor(R() * 366);
            for (const [d, t] of SEP) {if (R() < .5) {const b = (d - off + 366) % 366 + 1; for (const s of [b, b + 366]) if (s <= N) {sp[s] = Math.max(sp[s] || 0, MULT[t]); sp[s + 1] = Math.max(sp[s + 1] || 0, MULT[t]); ev.push({sol: s, msg: `A ${TIER[t]} solar particle event sweeps the site; crew dose rate climbs for 2 sols.`, k: 'sep'})} } }
            const dem = H.pw + K.crewPw * crew, cap = dem * K.bat, o2s = K.start * K.o2 * K.startCrew, ws = K.start * K.h2o * K.startCrew;
            let o2 = o2s, w = ws, bat = cap, dose = 0, dry = 0, red = 0, none = 0, maxTau = K.tau0, pfs = [], dead = null, half = 0, warn = 0, s = 0;
            for (s = 1; s <= N; s++) {
                const t = tau(s); maxTau = Math.max(maxTau, t);
                const gen = K.panel * S.sol * Math.exp(-(t - K.tau0)), net = gen - dem; let pf;
                if (net >= 0) {bat = Math.min(cap, bat + net); pf = 1} else {const u = Math.min(bat, -net); bat -= u; pf = (gen + u) / dem}
                pfs.push(pf); if (pf < .6) red++; if (pf < .05) none++;
                const th = .25 + .75 * pf; // MODEL ASSUMPTION: life-support loads get priority power
                w = Math.min(ws * 1.5, w + K.plant * K.h2o * (.85 + .3 * S.ice) * th - crew * K.h2o);
                o2 = Math.min(o2s * 1.5, o2 + K.plant * K.o2 * th - crew * K.o2);
                dose += K.dose * S.rad * (1 - H.sh) * (1 + (sp[s] || 0));
                if (w <= 0) {w = 0; dry++} else dry = 0;
                if (o2 < 0) o2 = 0;
                log.push({s, o2, w, pf, dose, tau: t});
                if (!half && dose >= K.limit / 2) {half = 1; ev.push({sol: s, msg: 'Each crew member has now absorbed half of NASA’s 600 mSv career dose limit.', k: 'warn'})}
                if (!warn && w < 10 * crew * K.h2o) {warn = 1; ev.push({sol: s, msg: 'Water reserves fall below ten sols of supply.', k: 'warn'})}
                const rec = pfs.slice(-15), avg = rec.reduce((a, b) => a + b, 0) / rec.length, storm = avg < .6;
                const pct = Math.round(avg * 100), tx = t.toFixed(1);
                if (o2 <= 0) dead = storm ? `A dust storm (optical depth ${tx}) cut solar power to ${pct}% of demand, oxygen generation stalled, and the crew ran out of breathable air on sol ${s}.` : `Oxygen generation could not keep up with ${crew} crew members; reserves ran out and the crew suffocated on sol ${s}.`;
                else if (dry >= 3) dead = storm ? `A dust storm (optical depth ${tx}) cut solar power to ${pct}% of demand, water extraction stalled, and the crew died of dehydration on sol ${s}.` : `Water production could not keep up with ${crew} crew members; reserves ran out and the crew died of dehydration on sol ${s}.`;
                else if (dose >= K.limit) dead = `Accumulated radiation passed NASA’s 600 mSv career limit on sol ${s}, so the mission was aborted.`;
                if (dead) {ev.push({sol: s, msg: dead, k: 'fatal'}); break}
            }
            const ok = !dead, run = Math.min(s, N);
            let score;
            if (ok) {const fr = Math.min(1, (o2 / o2s + w / ws) / 2); score = Math.round(Math.min(95, 100 - dose / K.limit * 30 - (1 - fr) * 20 - Math.min(20, red * .1)))}
            else score = Math.round(run / N * 40);
            ev.sort((a, b) => a.sol - b.sol);
            return {ok, score, cause: dead, run, log, ev, dose, maxTau, red, none, o2, w, sepCount: ev.filter(e => e.k === 'sep').length, site: S.n, hab: H.n, crew, seed, sh: H.sh};
        }
        // Group DONKI SEP records (many instruments per event) into episodes: records within 48h = one episode.
        // Tier is an ESTIMATE: any '>100 MeV' detection = severe(3), 4+ detections = moderate(2), else minor(1). Returns [dayOfYear, tier].
        function toEpisodes(raw) {
            const rs = raw.map(r => ({t: Date.parse(r.eventTime), hard: (r.instruments || []).some(i => String(i.displayName).includes('>100 MeV'))})).filter(r => !isNaN(r.t)).sort((a, b) => a.t - b.t);
            const cs = []; for (const r of rs) {const l = cs[cs.length - 1]; if (l && r.t - l[l.length - 1].t <= 48 * 36e5) l.push(r); else cs.push([r])}
            return cs.map(c => {const d = new Date(c[0].t), y = d.getUTCFullYear(); return [Math.round((Date.UTC(y, d.getUTCMonth(), d.getUTCDate()) - Date.UTC(y, 0, 0)) / 864e5), c.some(r => r.hard) ? 3 : c.length >= 4 ? 2 : 1]})
        }

        const $ = id => document.getElementById(id);
        const SD = {jezero: 'Ancient river delta. Good sunlight, moderate ice.', gale: 'Curiosity’s home. Our measured radiation baseline. Little ice.', utopia: 'Rich subsurface ice, weaker sunlight.', arcadia: 'Ice-rich northern plain, weaker sunlight.', hellas: 'Deepest basin. Thicker air shields radiation.'};
        const HD = {surface: 'Light shielding, low power use.', regolith: 'Buried in bricks. Better shielding, more power.', lava: 'Natural rock shelter. Heavy shielding, high power use.'};
        $('site').innerHTML = Object.entries(SITES).map(([k, v]) => `<option value="${k}">${v.n}</option>`).join('');
        $('hab').innerHTML = Object.entries(HABS).map(([k, v]) => `<option value="${k}">${v.n}</option>`).join('');
        $('crew').innerHTML = [2, 3, 4, 5, 6, 7, 8].map(n => `<option ${n == 4 ? 'selected' : ''}>${n}</option>`).join('');
        const upd = () => {$('sd').textContent = SD[$('site').value]; $('hd').textContent = HD[$('hab').value]}; $('site').onchange = $('hab').onchange = upd; upd();
        $('live').onclick = async () => {
            const st = $('lst'), key = $('key').value.trim() || 'DEMO_KEY', y = $('yr').value; st.textContent = 'Contacting NASA DONKI…';
            try {
                const r = await fetch(`https://api.nasa.gov/DONKI/SEP?startDate=${y}-01-01&endDate=${y}-12-31&api_key=${encodeURIComponent(key)}`);
                if (!r.ok) throw new Error(r.status == 429 ? 'rate limit reached, use your own API key' : 'HTTP ' + r.status);
                const j = await r.json(); if (!Array.isArray(j) || !j.length) throw new Error('no events returned');
                SEP = toEpisodes(j); SEPSRC = `NASA DONKI ${y} (live, ${SEP.length} episodes)`;
                st.textContent = `Loaded ${j.length} records, grouped into ${SEP.length} solar particle episodes from NASA DONKI ${y}. New runs use them.`
            }
            catch (err) {st.textContent = `Could not load live data (${err.message}). Still using ${SEPSRC}.`}
        };
        $('rnd').onclick = () => $('seed').value = 1 + Math.floor(Math.random() * 9999);
        let R, i, timer, speed = 5, paused = false, cfg;
        const cols = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)'], names = ['Oxygen', 'Water', 'Power', 'Radiation dose'];
        function show(id) {['setup', 'run', 'rep'].forEach(x => $(x).classList.toggle('hide', x !== id && !(id === 'rep' && x === 'run')))}
        function chart(n) {
            const L = R.log, mx = [Math.max(...L.map(d => d.o2)), Math.max(...L.map(d => d.w)), 1, K.limit];
            const v = [d => d.o2 / mx[0], d => d.w / mx[1], d => d.pf, d => d.dose / K.limit];
            $('ch').innerHTML = `<rect x="0" y="0" width="600" height="200" fill="none" stroke="var(--line)"/>` + v.map((f, k) => `<polyline fill="none" stroke="${cols[k]}" stroke-width="2" points="${L.slice(0, n).map((d, j) => `${(j / 499 * 596 + 2).toFixed(1)},${(196 - Math.min(1, f(d)) * 190).toFixed(1)}`).join(' ')}"/>`).join('')
        }
        function gauges(d) {
            const g = [[d.o2 / (R.log[0].o2 * 1.5), Math.round(d.o2) + ' kg'], [d.w / (R.log[0].w * 1.5), Math.round(d.w) + ' L'], [d.pf, Math.round(d.pf * 100) + '% of demand'], [d.dose / K.limit, d.dose.toFixed(0) + ' mSv']];
            $('gauges').innerHTML = g.map((x, k) => {const r = k == 3 ? x[0] : x[0], bad = k == 3 ? r > .75 : r < .15, warn = k == 3 ? r > .5 : r < .35; return `<div class="g"><div class="t"><span>${names[k]}</span><span>${x[1]}${k == 2 ? ` · tau ${d.tau.toFixed(1)}` : ''}</span></div><div class="bar"><i style="width:${Math.min(100, r * 100)}%;background:${bad ? 'var(--bad)' : warn ? 'var(--warn)' : 'var(--ok)'}"></i></div></div>`}).join('')
        }
        function tick() {
            const n = Math.min(i + speed, R.run); for (const e of R.ev.filter(e => e.sol > i && e.sol <= n)) {const d = document.createElement('div'); d.className = e.k; d.innerHTML = `<b>Sol ${e.sol}</b> ${e.msg}`; $('feed').prepend(d)}
            i = n; $('solc').textContent = `Sol ${i} / 500`; gauges(R.log[i - 1]); chart(i); if (i >= R.run) {clearInterval(timer); setTimeout(report, 700)}
        }
        function start(c) {cfg = c; R = simulate(c); i = 0; $('feed').innerHTML = ''; show('run'); $('pp').textContent = 'Pause'; paused = false; clearInterval(timer); timer = setInterval(() => {if (!paused) tick()}, 120)}
        $('go').onclick = () => start({site: $('site').value, crew: +$('crew').value, hab: $('hab').value, seed: +$('seed').value || 1});
        $('pp').onclick = () => {paused = !paused; $('pp').textContent = paused ? 'Resume' : 'Pause'};
        document.querySelectorAll('[data-sp]').forEach(b => b.onclick = () => speed = +b.dataset.sp);
        $('skip').onclick = () => {clearInterval(timer); for (const e of R.ev) {if (e.sol > i) {const d = document.createElement('div'); d.className = e.k; d.innerHTML = `<b>Sol ${e.sol}</b> ${e.msg}`; $('feed').prepend(d)} } i = R.run; $('solc').textContent = `Sol ${i} / 500`; gauges(R.log[i - 1]); chart(i); report()};
        function report() {
            const r = R, top = r.ev.filter(e => e.k == 'dust' || e.k == 'fatal' || (e.k == 'sep' && /severe/.test(e.msg))).slice(-3);
            $('rep').className = ''; $('rep').innerHTML = `<div class="card"><div class="verdict ${r.ok ? 'ok' : 'bad'}">${r.ok ? 'Crew survived' : 'Mission failed · sol ' + r.run}</div><div style="font-size:22px;margin:4px 0">Score ${r.score} / 100</div>
 <p>${r.ok ? `All ${r.crew} crew members completed 500 sols at ${r.site} in a ${r.hab}.` : r.cause}</p>
 <div class="stats"><div><b>${r.dose.toFixed(0)} mSv</b>dose per crew member, NASA career limit ${K.limit}</div><div><b>${r.maxTau.toFixed(1)}</b>worst dust optical depth</div><div><b>${r.sepCount}</b>solar particle events</div><div><b>${r.red}</b>sols with under 60% power</div><div><b>${Math.round(r.o2)} kg · ${Math.round(r.w)} L</b>oxygen and water left</div></div><p class="desc">Solar events: ${SEPSRC}</p>
 ${r.ok ? '' : `<h2>What went wrong</h2><ul>${top.map(e => `<li>Sol ${e.sol}: ${e.msg}</li>`).join('')}</ul>`}
 <div class="row"><button class="p" id="again">Run again, same seed</button><button id="chg">Change setup</button><button id="cmp">Compare habitats, same seed</button></div><div id="cmpo"></div></div>`;
            $('again').onclick = () => start(cfg); $('chg').onclick = () => {clearInterval(timer); $('rep').className = 'hide'; show('setup')};
            $('cmp').onclick = () => {$('cmpo').innerHTML = '<table><tr><th>Habitat</th><th>Result</th><th>Score</th><th>Dose</th></tr>' + Object.keys(HABS).map(h => {const x = simulate({...cfg, hab: h}); return `<tr><td>${HABS[h].n}</td><td class="${x.ok ? 'ok' : 'bad'}">${x.ok ? 'Survived' : 'Lost on sol ' + x.run}</td><td>${x.score}</td><td>${x.dose.toFixed(0)} mSv</td></tr>`}).join('') + '</table><p class="sub">Same storms, same flares. Only the habitat changed.</p>'};
            document.getElementById('rep').scrollIntoView({behavior: 'smooth'})
        }


// ---- AI MISSION ADVISOR ---------------------------------------------------
const aiQuestion = document.getElementById('ai-question');
const aiAsk = document.getElementById('ai-ask');
const aiClear = document.getElementById('ai-clear');
const aiAnswer = document.getElementById('ai-answer');
const aiStatus = document.getElementById('ai-status');

function missionSnapshot() {
    const out = {
        site: cfg ? cfg.site : $('site').value,
        crew: cfg ? cfg.crew : +$('crew').value,
        habitat: cfg ? cfg.hab : $('hab').value,
        seed: cfg ? cfg.seed : +$('seed').value || 1,
        solarEventSource: SEPSRC,
    };
    if (R) {
        out.result = {
            survived: R.ok,
            score: R.score,
            runSols: R.run,
            doseMsv: Number(R.dose.toFixed(1)),
            maxDustOpticalDepth: Number(R.maxTau.toFixed(2)),
            solarParticleEvents: R.sepCount,
            lowPowerSols: R.red,
            oxygenRemainingKg: Number(R.o2.toFixed(1)),
            waterRemainingL: Number(R.w.toFixed(1)),
            cause: R.cause || null,
        };
    }
    return out;
}

async function askMissionAdvisor() {
    const question = (aiQuestion.value || '').trim();
    if (!question) {
        aiAnswer.textContent = 'Enter a mission question first.';
        return;
    }
    aiAsk.disabled = true;
    aiStatus.textContent = 'Consulting mission intelligence…';
    aiAnswer.textContent = 'Analyzing mission state and constraints…';
    try {
        const response = await fetch('/api/mars-advisor', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({question, mission: missionSnapshot()})
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Advisor API error');
        aiAnswer.textContent = data.answer || 'No answer returned.';
        aiStatus.textContent = data.mode === 'openai' ? 'OpenAI Responses API' : 'Local mission reasoning fallback';
    } catch (error) {
        aiAnswer.textContent = `Advisor unavailable: ${error.message}`;
        aiStatus.textContent = 'API connection error';
    } finally {
        aiAsk.disabled = false;
    }
}

aiAsk?.addEventListener('click', askMissionAdvisor);
aiClear?.addEventListener('click', () => {
    aiQuestion.value = '';
    aiAnswer.textContent = 'Advisor ready. Run a mission first for result-aware guidance.';
    aiStatus.textContent = 'Local rules + optional OpenAI Responses API';
});
aiQuestion?.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') askMissionAdvisor();
});
