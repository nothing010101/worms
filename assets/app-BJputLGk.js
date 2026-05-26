(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]'))
        a(n);
    new MutationObserver(n => {
        for (const i of n)
            if (i.type === "childList")
                for (const c of i.addedNodes)
                    c.tagName === "LINK" && c.rel === "modulepreload" && a(c)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function s(n) {
        const i = {};
        return n.integrity && (i.integrity = n.integrity),
        n.referrerPolicy && (i.referrerPolicy = n.referrerPolicy),
        n.crossOrigin === "use-credentials" ? i.credentials = "include" : n.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin",
        i
    }
    function a(n) {
        if (n.ep)
            return;
        n.ep = !0;
        const i = s(n);
        fetch(n.href, i)
    }
}
)();
const ze = "/PNG/Objects_separetely/"
  , U = "/PNG/"
  , B = [["Tentacle_plant_shadow1", 128, 128, 3, 220, .75], ["Eye_plant_shadow1", 64, 64, 3, 280, .9], ["Spike_plant_shadow1", 256, 256, 4, 300, .55], ["Bones_shadow1", 256, 256, 11, 110, .55], ["Rock_eyes_shadow1", 128, 128, 5, 180, .75], ["Veins_shadow1", 256, 256, 4, 350, .5], ["Meat_flower_shadow1", 128, 128, 3, 230, .75], ["Pustules_shadow1", 64, 64, 3, 190, .9], ["Many_eyes_plant_shadow1", 64, 64, 3, 150, .9], ["Fetus_shadow1", 128, 128, 3, 300, .7], ["Jaws_plant_shadow1", 128, 128, 3, 170, .75], ["Rock3_shadow1", 64, 80, 6, 140, 1]]
  , Ge = [3, 4, 1, 1, 2, 1, 2, 3, 3, 1, 2, 3];
function F(e) {
    return new Promise(t => {
        const s = new Image;
        s.onload = () => t(s),
        s.onerror = () => t(null),
        s.src = e
    }
    )
}
async function Ve(e, t) {
    return Promise.all(Array.from({
        length: t
    }, (s, a) => F(`${ze}${e}_${a + 1}.png`)))
}
let K = null;
class Je {
    constructor() {
        this._bgCanvas = null,
        this._decos = []
    }
    get decos() {
        return this._decos
    }
    async init(t, s) {
        const [a,n,i] = await Promise.all([F(U + "Ground.png"), F(U + "spots.png"), F(U + "details.png")]);
        K = null;
        const c = await Promise.all(B.map( ([r,,,h]) => Ve(r, h)))
          , o = 80;
        for (let r = 0; r < B.length; r++) {
            const [,h,u,,m,l] = B[r]
              , d = Math.round(h * l)
              , w = Math.round(u * l)
              , v = c[r].filter(Boolean);
            if (v.length)
                for (let x = 0; x < Ge[r]; x++) {
                    const S = qe(t, s, o);
                    S && this._decos.push({
                        x: S[0],
                        y: S[1],
                        w: d,
                        h: w,
                        type: B[r][0],
                        frames: v,
                        ms: m,
                        frame: Math.floor(Math.random() * v.length),
                        lastT: Math.random() * -2e3
                    })
                }
        }
        this._bgCanvas = Ke(t, s, a, n, i)
    }
    update(t) {
        for (const s of this._decos)
            t - s.lastT >= s.ms && (s.frame = (s.frame + 1) % s.frames.length,
            s.lastT = t)
    }
    drawBackground(t) {
        this._bgCanvas && t.drawImage(this._bgCanvas, 0, 0)
    }
    drawDecorations(t) {
        for (const s of this._decos) {
            const a = s.frames[s.frame];
            a && t.drawImage(a, s.x - s.w / 2, s.y - s.h / 2, s.w, s.h)
        }
    }
}
function Ke(e, t, s, a, n, i) {
    const c = document.createElement("canvas");
    c.width = e,
    c.height = t;
    const o = c.getContext("2d");
    o.imageSmoothingEnabled = !1;
    const r = o.createLinearGradient(0, 0, 0, t);
    r.addColorStop(0, "#110700"),
    r.addColorStop(.3, "#1e0d04"),
    r.addColorStop(.7, "#2a1208"),
    r.addColorStop(1, "#351a0a"),
    o.fillStyle = r,
    o.fillRect(0, 0, e, t);
    const h = o.createRadialGradient(e / 2, t / 2, t * .2, e / 2, t / 2, t * .9);
    if (h.addColorStop(0, "rgba(0,0,0,0)"),
    h.addColorStop(1, "rgba(0,0,0,0.55)"),
    o.fillStyle = h,
    o.fillRect(0, 0, e, t),
    s) {
        o.globalAlpha = .09;
        const u = s.width
          , m = s.height;
        for (let l = 0; l < e; l += u)
            for (let d = 0; d < t; d += m)
                o.drawImage(s, l, d);
        o.globalAlpha = 1
    }
    if (a) {
        o.globalAlpha = .07;
        const u = a.width
          , m = a.height;
        for (let l = 0; l < e; l += u)
            for (let d = 0; d < t; d += m)
                o.drawImage(a, l, d);
        o.globalAlpha = 1
    }
    if (n) {
        o.globalAlpha = .13;
        for (let u = 0; u < 35; u++) {
            const m = 1.5 + Math.random() * 2.5
              , l = Math.random() * e
              , d = Math.random() * t;
            o.drawImage(n, l, d, n.width * m, n.height * m)
        }
        o.globalAlpha = 1
    }
    if (s) {
        const u = [[.08, .12], [.45, .08], [.82, .15], [.15, .75], [.55, .8], [.9, .7]];
        o.globalAlpha = .18;
        for (const [m,l] of u) {
            const d = .9 + Math.random() * .6
              , w = s.width * d
              , v = s.height * d;
            o.drawImage(s, m * e - w / 2, l * t - v / 2, w, v)
        }
        o.globalAlpha = 1
    }
    return c
}
function qe(e, t, s, a, n, i) {
    for (let c = 0; c < 40; c++) {
        const o = s + Math.random() * (e - s * 2)
          , r = s + Math.random() * (t - s * 2);
        return [o, r]
    }
    return null
}
const H = "https://dev-api.flayerlabs.xyz"
  , I = "base"
  , Xe = "0xECbdB1F71a8727c291dA420d326953c749a88b07"
  , de = "0xECbdB1F71a8727c291dA420d326953c749a88b07".trim()
  , Ye = /^0x[a-fA-F0-9]{40}$/
  , q = Ye.test(de) ? de : Xe;
async function te(e) {
    try {
        const t = await fetch(`${H}/v1/${I}/tokens/${e}`);
        return t.ok ? t.json() : null
    } catch {
        return null
    }
}
const se = e => new Promise(t => setTimeout(t, e));
function C(e, t) {
    if (!e)
        return 0;
    const s = String(e);
    if (!Number.isFinite(t))
        return Number(s) || 0;
    const a = Math.max(0, Number(t) || 0)
      , n = s.startsWith("-")
      , i = n ? s.slice(1) : s
      , c = i.length > a ? i.slice(0, -a) : "0"
      , o = i.length > a ? i.slice(-a) : i.padStart(a, "0")
      , r = +`${n ? "-" : ""}${c}.${o}`;
    return Number.isFinite(r) ? r : 0
}
async function Ze(e, t) {
    let a = 0
      , n = 0;
    for (let i = 0; i < 20; i++) {
        const c = await fetch(`${H}/v1/${I}/tokens/${e}/holders?limit=100&offset=${a}`);
        if (!c.ok)
            break;
        const r = (await c.json()).holders ?? [];
        if (!r.length)
            break;
        for (const h of r)
            n += C(h.balance, t);
        if (r.length < 100)
            break;
        a += 100,
        await se(140)
    }
    return n
}
async function Ce(e, t) {
    var n;
    const s = Number(e.decimals ?? ((n = e.token) == null ? void 0 : n.decimals) ?? 18);
    let a = C(e.totalSupply ?? e.total_supply, s) || C(e.totalSupplyRaw ?? e.total_supply_raw, s) || C(e.supply ?? e.maxSupply, s);
    return a || (a = await Ze(t, s)),
    {
        totalSupply: a,
        decimals: s
    }
}
async function Qe(e, t=.5) {
    const s = await te(e);
    if (!s)
        throw new Error("Token metadata unavailable");
    const {totalSupply: a, decimals: n} = await Ce(s, e);
    if (!a)
        throw new Error("Total supply could not be determined");
    const i = Number(t) / 100
      , c = 100;
    let o = 0
      , r = !0;
    const h = [];
    for (; r; ) {
        const u = await fetch(`${H}/v1/${I}/tokens/${e}/holders?limit=${c}&offset=${o}`);
        if (!u.ok)
            throw new Error(`Token holders unavailable (${u.status})`);
        const l = (await u.json()).holders ?? [];
        if (!l.length)
            break;
        for (const d of l) {
            const w = C(d.balance, n)
              , v = a > 0 ? w / a : 0;
            if (v >= i)
                h.push({
                    address: d.id,
                    balance: w,
                    share: v
                });
            else {
                r = !1;
                break
            }
        }
        if (o += c,
        l.length < c)
            break;
        await se(140)
    }
    return h
}
async function Me() {
    var s, a;
    const e = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true");
    if (!e.ok)
        throw new Error(`ETH feed unavailable (${e.status})`);
    const t = await e.json();
    return {
        priceUsd: Number(((s = t == null ? void 0 : t.ethereum) == null ? void 0 : s.usd) ?? 0),
        change24h: Number(((a = t == null ? void 0 : t.ethereum) == null ? void 0 : a.usd_24h_change) ?? 0)
    }
}
async function et() {
    var a;
    const e = await fetch("https://api.alternative.me/fng/?limit=1");
    if (!e.ok)
        throw new Error(`Sentiment feed unavailable (${e.status})`);
    const t = await e.json()
      , s = (a = t == null ? void 0 : t.data) == null ? void 0 : a[0];
    return {
        score: Number((s == null ? void 0 : s.value) ?? 50),
        label: (s == null ? void 0 : s.value_classification) ?? "Neutral"
    }
}
async function tt(e, t) {
    const s = await te(e);
    if (!s)
        throw new Error("Token metadata unavailable");
    const {totalSupply: a, decimals: n} = await Ce(s, e)
      , i = t.toLowerCase()
      , c = 100;
    let o = 0
      , r = null;
    for (; !r; ) {
        const u = await fetch(`${H}/v1/${I}/tokens/${e}/holders?limit=${c}&offset=${o}`);
        if (!u.ok)
            throw new Error(`Balance check unavailable (${u.status})`);
        const l = (await u.json()).holders ?? [];
        if (!l.length || (r = l.find(d => (d.id ?? "").toLowerCase() === i) ?? null,
        r || l.length < c))
            break;
        o += c,
        await se(140)
    }
    const h = C((r == null ? void 0 : r.balance) ?? 0, n);
    return {
        balance: h,
        share: a > 0 ? h / a : 0,
        decimals: n
    }
}
async function st(e) {
    const t = await te(e);
    if (!t)
        throw new Error("Token economics unavailable");
    const s = Number(t.marketCapUsd ?? t.market_cap_usd ?? t.marketCap ?? 0)
      , a = Number(t.volume24hUsd ?? t.volume_24h_usd ?? t.volume24h ?? 0)
      , n = Number(t.tvlUsd ?? t.tvl_usd ?? 0);
    return {
        marketCapUsd: s,
        volume24hUsd: a,
        tvlUsd: n
    }
}
async function at(e) {
    const t = await fetch(`${H}/v1/${I}/tokens/${e}/price`);
    if (!t.ok)
        throw new Error(`Token price data unavailable (${t.status})`);
    return t.json()
}
let E, xe, $e, he, M, j = null, X = null, Pe = 0;
const P = [];
let Y = [];
function nt({canvas: e, worms: t, decos: s, sprites: a, onLoadHolders: n, getContext: i}) {
    E = t,
    xe = s,
    $e = a,
    he = n,
    M = i;
    const c = document.getElementById("loadHoldersBtn");
    c == null || c.addEventListener("click", async () => {
        const m = M();
        if (m.tokenAddress) {
            R("Refreshing holders...");
            try {
                const {holders: l, minShare: d} = await he(m.tokenAddress);
                Le(`Refreshed ${l.length} holders with >= ${d}% supply`),
                R(`Refreshed ${l.length} holders`),
                D()
            } catch (l) {
                R(l.message)
            }
        }
    }
    );
    const o = document.getElementById("walletFocusInput")
      , r = document.getElementById("walletFocusBtn")
      , h = () => {
        const m = o == null ? void 0 : o.value.trim().toLowerCase();
        if (!m)
            return G("Paste a holder wallet");
        const l = (E ?? []).find(d => !d.isNPC && (d.wallet ?? "").toLowerCase() === m);
        if (!l)
            return G("Holder worm not found");
        X = l,
        Pe = performance.now() + 4e3,
        me(l),
        G(`Selected ${l.wallet.slice(0, 6)}...${l.wallet.slice(-4)}`)
    }
    ;
    r == null || r.addEventListener("click", h),
    o == null || o.addEventListener("keydown", m => {
        m.key === "Enter" && h()
    }
    ),
    e.addEventListener("mousemove", m => {
        const l = e.getBoundingClientRect()
          , d = ue(m.clientX - l.left, m.clientY - l.top);
        j = d,
        e.style.cursor = d ? "pointer" : "default"
    }
    ),
    e.addEventListener("mouseleave", () => {
        j = null
    }
    ),
    e.addEventListener("click", m => {
        const l = e.getBoundingClientRect()
          , d = ue(m.clientX - l.left, m.clientY - l.top);
        return d ? d.type === "worm" ? me(d.ref) : it(d.ref) : D()
    }
    ),
    D(),
    setInterval( () => Be(), 800);
    const u = (m, l) => {
        var d;
        (d = document.getElementById(m)) == null || d.addEventListener("click", () => {
            l()
        }
        )
    }
    ;
    u("sb-bones", Re),
    u("sb-manyeyes", Ne),
    u("sb-veins", He),
    u("sb-rockeyes", Ie),
    u("sb-pustules", () => $("Pustules_shadow1")),
    u("sb-fetus", () => $("Fetus_shadow1")),
    u("sb-jaws", () => $("Jaws_plant_shadow1")),
    u("sb-meatflower", () => $("Meat_flower_shadow1"))
}
function ue(e, t) {
    for (let s = E.length - 1; s >= 0; s--) {
        const a = E[s]
          , n = Math.max(34, (a.half ?? 32) + 10);
        if (Math.hypot(e - a.x, t - a.y) < n)
            return {
                type: "worm",
                ref: a
            }
    }
    for (const s of xe)
        if (e >= s.x - s.w / 2 && e <= s.x + s.w / 2 && t >= s.y - s.h / 2 && t <= s.y + s.h / 2)
            return {
                type: "deco",
                ref: s
            };
    return null
}
function ot(e, t) {
    const s = X && performance.now() <= Pe;
    if (!j && !s)
        return;
    e.save(),
    e.strokeStyle = "rgba(250, 204, 21, 0.85)",
    e.lineWidth = 2,
    e.setLineDash([5, 4]),
    e.lineDashOffset = -(t * .025) % 9;
    const a = s ? {
        type: "worm",
        ref: X
    } : j;
    if (a.type === "worm") {
        e.beginPath();
        const n = Math.max(36, (a.ref.half ?? 32) + 12);
        e.arc(a.ref.x, a.ref.y, n, 0, Math.PI * 2),
        e.stroke()
    } else {
        const {x: n, y: i, w: c, h: o} = a.ref;
        e.strokeRect(n - c / 2 - 5, i - o / 2 - 5, c + 10, o + 10)
    }
    e.restore()
}
function D() {
    const e = M()
      , t = E.filter(a => !a.isNPC)
      , s = t.reduce( (a, n) => a + n.revenueETH, 0);
    ae().innerHTML = `
        <div class="rp-head">
            <span class="label-small">Holder Colony Revenue</span>
            <div class="rev-big">${s.toFixed(6)} ETH</div>
            <div class="rev-unit">Instant stream while wallets remain holders</div>
        </div>
        <div class="rp-divider"></div>
        <div class="rp-section">
            <span class="label-small">Token Status</span>
            <div class="stat-row"><span>Token</span><b>${e.tokenAddress ? `${e.tokenAddress.slice(0, 8)}...` : "Not loaded"}</b></div>
            <div class="stat-row"><span>Eligible Holders</span><b>${t.length}</b></div>
            <div class="stat-row"><span>Minimum Share</span><b>0.5%</b></div>
            <div class="stat-row"><span>Auto Refresh</span><b>${Math.round((e.refreshMs ?? 3e4) / 1e3)}s</b></div>
        </div>
        <div class="rp-divider"></div>
        <div class="rp-section">
            <span class="label-small">Click an Asset</span>
            <div class="rp-hint">- Bones: wallet balance modal</div>
            <div class="rp-hint">- Many Eyes: AI chat assistant</div>
            <div class="rp-hint">- Veins: ETH pulse on Base</div>
            <div class="rp-hint">- Rock Eyes: market sentiment</div>
        </div>`
}
function me(e) {
    const t = !e.isNPC && e.wallet ? `<a class="spawn-btn small" style="margin-top:10px;text-decoration:none" href="https://basescan.org/address/${e.wallet}" target="_blank" rel="noopener noreferrer">View wallet on BaseScan</a>` : "";
    ae().innerHTML = `
        <div class="agent-card">
            <canvas id="ap-sprite" width="72" height="72"></canvas>
            <div class="agent-meta">
                <div class="agent-name">${e.isNPC ? e.name : "Holder Worm"}</div>
                <div class="agent-role" style="color:${e.isNPC ? "#7a6540" : "#60a5fa"}">${e.isNPC ? "NPC" : "Wallet-linked"}</div>
                <div class="agent-trait dim">${e.wallet ?? "System worm"}</div>
            </div>
        </div>
        <div class="rp-divider"></div>
        <div class="rp-section">
            <div class="stat-row"><span>Revenue</span><b>${e.revenueETH.toFixed(6)} ETH</b></div>
            <div class="stat-row"><span>Holder Share</span><b>${(e.share * 100).toFixed(3)}%</b></div>
            ${e.isNPC ? "" : '<div class="stat-row"><span>Sprite size</span><b>Scales with % held</b></div>'}
            ${t}
        </div>`,
    dt("ap-sprite", e.variant)
}
function it(e) {
    var n;
    const t = e.type ?? "Unknown"
      , s = t.replace(/_/g, " ")
      , a = ht[t] ?? {
        emoji: "🧬",
        title: s,
        text: "Ambient structure in the caverns. Cosmetic but logged in the colony feed.",
        action: null
    };
    ae().innerHTML = `
        <div class="deco-card">
            <div class="deco-emoji">${a.emoji ?? "❓"}</div>
            <div class="agent-meta">
                <div class="agent-name">${a.title}</div>
                <div class="agent-trait dim">${e.type}</div>
            </div>
        </div>
        <div class="rp-divider"></div>
        <div class="rp-section">
            <p class="ability-desc">${a.text}</p>
            ${a.action ? `<button class="spawn-btn small" id="deco-action">${a.action}</button>` : ""}
        </div>`,
    (n = document.getElementById("deco-action")) == null || n.addEventListener("click", () => rt(e.type))
}
async function rt(e) {
    return e === "Bones_shadow1" ? Re() : e === "Many_eyes_plant_shadow1" ? Ne() : e === "Veins_shadow1" ? He() : e === "Rock_eyes_shadow1" ? Ie() : $(e)
}
async function Re() {
    var s;
    const e = M().tokenAddress;
    if (!e)
        return R("Load token first to use balance check");
    L(`
        <div class="modal-card">
            <h3>Wallet Balance Check</h3>
            <input id="wallet-check-input" class="text-input" placeholder="0x wallet address" />
            <button class="spawn-btn small" id="wallet-check-btn">Check balance</button>
            <div id="wallet-check-result" class="rp-hint"></div>
        </div>`),
    (s = document.getElementById("wallet-check-btn")) == null || s.addEventListener("click", async () => {
        var i;
        const a = (i = document.getElementById("wallet-check-input")) == null ? void 0 : i.value.trim();
        if (!a)
            return;
        const n = await tt(e, a);
        document.getElementById("wallet-check-result").textContent = `${n.balance.toFixed(4)} tokens (${(n.share * 100).toFixed(4)}% supply)`
    }
    )
}
function Ne() {
    var t;
    L(`
        <div class="modal-card">
            <h3>Worm AI Console</h3>
            <div id="ai-chat-log" class="chat-log"></div>
            <input id="ai-chat-input" class="text-input" placeholder="Ask about holders, ETH, or strategy..." />
            <button class="spawn-btn small" id="ai-chat-send">Send</button>
        </div>`),
    fe(),
    (t = document.getElementById("ai-chat-send")) == null || t.addEventListener("click", async () => {
        const s = document.getElementById("ai-chat-input")
          , a = s.value.trim();
        if (!a)
            return;
        Y.push({
            role: "user",
            text: a
        });
        const n = await ct(a).catch( () => lt(a));
        Y.push({
            role: "bot",
            text: n
        }),
        s.value = "",
        fe()
    }
    )
}
async function He() {
    const e = await Me();
    L(`
        <div class="modal-card">
            <h3>ETH on Base Pulse</h3>
            <p class="ability-desc">ETH price: $${e.priceUsd.toLocaleString()}</p>
            <p class="ability-desc">24h change: ${e.change24h.toFixed(2)}%</p>
        </div>`)
}
async function Ie() {
    const e = await et();
    L(`
        <div class="modal-card">
            <h3>Market Sentiment</h3>
            <p class="ability-desc">Fear & Greed score: ${e.score}</p>
            <p class="ability-desc">Classification: ${e.label}</p>
        </div>`)
}
function lt(e) {
    const t = e.toLowerCase()
      , s = E.filter(a => !a.isNPC).length;
    return t.includes("holder") ? `Current eligible holders at >=0.5%: ${s}. Keep monitor refresh active.` : t.includes("revenue") ? "Revenue is streamed per holder worm and stops when that wallet is no longer in the eligible holder set." : t.includes("eth") ? "Use the Veins asset to open the ETH pulse modal with live price and 24h change." : "Suggested action: load your token, verify whale holders, then track holder lifetime and revenue drift every cycle."
}
async function $(e) {
    var x, S, ie;
    const t = M().tokenAddress;
    if (!t)
        return R("Token not loaded");
    const s = await at(t)
      , a = s.price ?? {}
      , n = s.volume ?? {}
      , i = s.trading ?? {}
      , c = 10n ** 18n
      , o = (_, b=4) => {
        const g = Number(_ ?? 0);
        return Number.isFinite(g) ? g.toFixed(b) : "0"
    }
      , r = (_, b=6) => {
        if (_ == null)
            return "0";
        const g = String(_).trim();
        if (!g)
            return "0";
        if (g.includes(".") || !/^\d+$/.test(g))
            return o(g, b);
        try {
            const re = BigInt(g)
              , W = re / c
              , le = re % c;
            if (le === 0n)
                return W.toString();
            const ce = le.toString().padStart(18, "0").slice(0, b).replace(/0+$/, "");
            return ce ? `${W}.${ce}` : W.toString()
        } catch {
            return o(g, b)
        }
    }
      , h = r(n.volume24h, 6)
      , u = r(a.marketCapETH, 6)
      , m = r(a.startingMarketCapETH, 6)
      , l = Number(h) * .003
      , w = {
        Tentacle_plant_shadow1: {
            title: "Token Volume Feed",
            rows: [["24h Volume", `${h} ETH`], ["7d Volume", `${r(n.volume7d, 6)} ETH`], ["Est. 24h Fees (0.3%)", `${o(l, 6)} ETH`]]
        },
        Eye_plant_shadow1: {
            title: "Price Extremes",
            rows: [["Current Price", o(a.current, 6)], ["All-Time High", o(a.allTimeHigh, 6)], ["All-Time Low", o(a.allTimeLow, 6)]]
        },
        Spike_plant_shadow1: {
            title: "Bid Wall Monitor",
            rows: [["Bid Wall Balance", o(i.bidWallBalance, 4)], ["Bid Wall Remaining", o(i.bidWallRemaining, 4)], ["Remaining %", `${o(i.bidWallRemainingPercentage, 2)}%`]]
        },
        Meat_flower_shadow1: {
            title: "Buyback Progress",
            rows: [["Buyback Balance", o(i.buybackBalance, 4)], ["Buyback Progress", `${o(i.buybackProgress, 2)}%`], ["Price 24h Change", `${o(a.priceChange24hPercentage, 2)}%`]]
        },
        Pustules_shadow1: {
            title: "Micro Price Pulse",
            rows: [["Current Price", o(a.current, 6)], ["Market Cap ETH", `${u} ETH`], ["Price ETH", o(a.priceETH, 8)]]
        },
        Fetus_shadow1: {
            title: "Token Lifecycle",
            rows: [["Token Active", String(((x = s.status) == null ? void 0 : x.isActive) ?? !1)], ["Owner", String(((S = s.status) == null ? void 0 : S.owner) ?? "unknown").slice(0, 14) + "..."], ["Created At", (ie = s.status) != null && ie.createdAt ? new Date(Number(s.status.createdAt) * 1e3).toLocaleString() : "n/a"]]
        },
        Jaws_plant_shadow1: {
            title: "Fee Estimator",
            rows: [["24h Volume", `${h} ETH`], ["Fee Rate", "0.30%"], ["Estimated Fees (24h)", `${o(l, 6)} ETH`]]
        },
        Rock3_shadow1: {
            title: "Market Cap & Growth",
            rows: [["Market Cap ETH", `${u} ETH`], ["Starting MC ETH", `${m} ETH`], ["24h Change", `${o(a.priceChange24hPercentage, 2)}%`]]
        }
    }[e] ?? {
        title: "Token Intel",
        rows: [["Current Price", o(a.current, 6)], ["24h Volume", o(n.volume24h, 4)], ["Market Cap ETH", `${u} ETH`]]
    }
      , v = w.rows.map( ([_,b]) => `<div class="stat-row"><span>${_}</span><b>${b}</b></div>`).join("");
    L(`
        <div class="modal-card">
            <h3>${w.title}</h3>
            ${v}
        </div>`),
    Le(`Opened ${w.title} from ${e.replace(/_/g, " ")}`)
}
async function ct(e) {
    const t = M()
      , s = {
        question: e,
        tokenAddress: t.tokenAddress,
        holders: (E ?? []).filter(i => !i.isNPC).length
    }
      , a = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(s)
    });
    if (!a.ok)
        throw new Error(`AI API ${a.status}`);
    const n = await a.json();
    if (!(n != null && n.answer))
        throw new Error("AI response empty");
    return n.answer
}
function fe() {
    const e = document.getElementById("ai-chat-log");
    e && (e.innerHTML = Y.slice(-10).map(t => `<div class="chat-${t.role}">${t.text}</div>`).join(""))
}
function L(e) {
    var s, a;
    z();
    const t = document.createElement("div");
    t.id = "overlay-modal",
    t.className = "overlay-modal",
    t.innerHTML = `<div class="overlay-backdrop"></div><div class="overlay-content">${e}<button id="modal-close" class="spawn-btn small">Close</button></div>`,
    document.body.appendChild(t),
    (s = document.getElementById("modal-close")) == null || s.addEventListener("click", z),
    (a = t.querySelector(".overlay-backdrop")) == null || a.addEventListener("click", z)
}
function z() {
    var e;
    (e = document.getElementById("overlay-modal")) == null || e.remove()
}
function R(e) {
    const t = document.getElementById("holder-status");
    t && (t.textContent = e)
}
function G(e) {
    const t = document.getElementById("wallet-focus-status");
    t && (t.textContent = e)
}
function Le(e) {
    P.unshift({
        msg: e,
        time: new Date().toLocaleTimeString()
    }),
    P.length > 30 && P.pop(),
    Be()
}
function Be() {
    const e = document.getElementById("activity-list");
    if (e) {
        if (!P.length) {
            e.innerHTML = '<span class="dim">Waiting for holder events…</span>';
            return
        }
        e.innerHTML = P.slice(0, 10).map(t => `<div class="log-entry"><span class="log-time">${t.time}</span><span class="log-msg">${t.msg}</span></div>`).join("")
    }
}
const V = {};
function dt(e, t) {
    clearInterval(V[e]);
    let s = 0;
    V[e] = setInterval( () => {
        const a = document.getElementById(e);
        if (!a)
            return clearInterval(V[e]);
        const n = a.getContext("2d");
        n.imageSmoothingEnabled = !1,
        n.clearRect(0, 0, a.width, a.height),
        n.drawImage($e[t], s * 16, 0, 16, 16, 4, 4, a.width - 8, a.height - 8),
        s = (s + 1) % 8
    }
    , 110)
}
const ae = () => document.getElementById("right-panel-body")
  , ht = {
    Tentacle_plant_shadow1: {
        emoji: "🪸",
        title: "Signal Tentacles",
        text: "Shows live volume + estimated 24h fee flow from token price data.",
        action: "Open Token Volume Feed"
    },
    Eye_plant_shadow1: {
        emoji: "👁",
        title: "Watcher Node",
        text: "Shows ATH/ATL/current price to track market structure.",
        action: "Open Price Extremes"
    },
    Spike_plant_shadow1: {
        emoji: "🌵",
        title: "Spine Growth",
        text: "Shows bid wall state and remaining liquidity support.",
        action: "Open Bid Wall Monitor"
    },
    Bones_shadow1: {
        emoji: "🦴",
        title: "Holder Wallet Scanner",
        text: "Open a modal to check any wallet token balance and supply share.",
        action: "Open Balance Check"
    },
    Many_eyes_plant_shadow1: {
        emoji: "🔮",
        title: "Worm AI Assistant",
        text: "Chat with the local AI module for strategy and holder insights.",
        action: "Open AI Chat"
    },
    Veins_shadow1: {
        emoji: "🩸",
        title: "ETH Base Pulse",
        text: "Shows current ETH price and daily momentum.",
        action: "Open ETH Pulse"
    },
    Rock_eyes_shadow1: {
        emoji: "🪨",
        title: "Market Sentiment Oracle",
        text: "Displays a live Fear & Greed sentiment snapshot.",
        action: "Open Sentiment"
    },
    Meat_flower_shadow1: {
        emoji: "🌺",
        title: "Reward Bloom",
        text: "Tracks buyback progress and current momentum from token data.",
        action: "Open Buyback Progress"
    },
    Pustules_shadow1: {
        emoji: "🫧",
        title: "Spore Cluster",
        text: "Shows micro price pulse and market cap values.",
        action: "Open Micro Price Pulse"
    },
    Fetus_shadow1: {
        emoji: "🌀",
        title: "Larval Core",
        text: "Shows token lifecycle data: status, owner, creation timestamp.",
        action: "Open Token Lifecycle"
    },
    Jaws_plant_shadow1: {
        emoji: "🦷",
        title: "Collector Jaws",
        text: "Shows 24h fee estimation from token volume and protocol fee rate.",
        action: "Open Fee Estimator"
    },
    Rock3_shadow1: {
        emoji: "💎",
        title: "Crystal Node",
        text: "Shows market cap trajectory and 24h growth for $WORMS.",
        action: "Open Market Cap Growth"
    }
}
  , p = document.getElementById("gameCanvas")
  , f = p.getContext("2d")
  , ut = document.getElementById("worm-count")
  , mt = document.getElementById("mode")
  , N = new Je
  , ne = []
  , y = []
  , A = 16
  , pe = 16
  , we = 8
  , Z = 21
  , ft = 5
  , ve = 64
  , O = 2.1
  , pt = .04
  , oe = .5
  , J = oe / 100
  , ge = .5
  , ye = .52
  , wt = 1.48
  , Ae = 3e4
  , vt = .003
  , Oe = "worms-holder-starts-v1";
let be = performance.now()
  , Ee = q
  , Fe = []
  , Se = null
  , _e = null
  , Q = 0
  , T = {
    marketCapUsd: 0,
    volume24hUsd: 0,
    tvlUsd: 0
}
  , k = Tt();
function je() {
    p.width = window.innerWidth,
    p.height = window.innerHeight,
    f.imageSmoothingEnabled = !1
}
function gt() {
    return new Promise(e => {
        let t = 0;
        for (let s = 0; s < Z; s++) {
            const a = new Image;
            a.src = `/worms/8Bit-Worm-var${String(s).padStart(2, "0")}-byImogiaGames.png`,
            a.onload = () => {
                t += 1,
                t === Z && e()
            }
            ,
            ne.push(a)
        }
    }
    )
}
function yt(e) {
    const t = ge - J;
    if (!(e > 0) || t <= 0)
        return 1;
    const a = (Math.min(ge, Math.max(J, e)) - J) / t
      , n = Math.pow(Math.min(1, Math.max(0, a)), .58);
    return ye + (wt - ye) * n
}
class We {
    constructor({name: t, wallet: s=null, share: a=0, isNPC: n=!1, x: i, y: c}) {
        this.name = t,
        this.wallet = s,
        this.share = a,
        this.isNPC = n,
        this.aliveSince = performance.now(),
        this.revenueETH = 0,
        this._syncPixelSize();
        const o = this.half;
        this.x = i ?? o + Math.random() * (p.width - this.pixelSize),
        this.y = c ?? o + Math.random() * (p.height - this.pixelSize),
        this.variant = Math.floor(Math.random() * Z),
        this.frame = Math.floor(Math.random() * we),
        this.frameTick = 0,
        this.facingLeft = !1,
        this.angle = Math.random() * Math.PI * 2,
        this.vx = Math.cos(this.angle) * O,
        this.vy = Math.sin(this.angle) * O,
        this.missedRefreshes = 0
    }
    _syncPixelSize() {
        this.isNPC ? this.pixelSize = ve : this.pixelSize = Math.max(28, Math.round(ve * yt(this.share))),
        this.half = this.pixelSize / 2
    }
    move(t) {
        Math.random() < pt && (this.angle += (Math.random() - .5) * 1.4,
        this.vx = Math.cos(this.angle) * O,
        this.vy = Math.sin(this.angle) * O),
        this.x += this.vx * (t / 16),
        this.y += this.vy * (t / 16),
        this.facingLeft = this.vx < 0;
        const s = this.half;
        if (this.x < s && (this.x = s,
        this.vx = Math.abs(this.vx)),
        this.x > p.width - s && (this.x = p.width - s,
        this.vx = -Math.abs(this.vx)),
        this.y < s && (this.y = s,
        this.vy = Math.abs(this.vy)),
        this.y > p.height - s && (this.y = p.height - s,
        this.vy = -Math.abs(this.vy)),
        K) {
            const {x: a, y: n, w: i, h: c} = K;
            this.x + s > a && this.x - s < a + i && this.y + s > n && this.y - s < n + c && (this.vx *= -1,
            this.vy *= -1)
        }
        ++this.frameTick >= ft && (this.frameTick = 0,
        this.frame = (this.frame + 1) % we),
        this.isNPC || (this.revenueETH += _t(this.share) * t)
    }
    draw() {
        const t = ne[this.variant];
        if (!t)
            return;
        f.save(),
        this.facingLeft ? (f.translate(this.x, this.y),
        f.scale(-1, 1),
        f.drawImage(t, this.frame * A, 0, A, pe, -this.half, -this.half, this.pixelSize, this.pixelSize)) : f.drawImage(t, this.frame * A, 0, A, pe, this.x - this.half, this.y - this.half, this.pixelSize, this.pixelSize),
        f.restore();
        const s = this.wallet ? `${this.wallet.slice(0, 6)}...${this.wallet.slice(-4)}` : this.name;
        bt(this.x, this.y - this.half - 8, s, "#facc15")
    }
}
function bt(e, t, s, a) {
    f.font = "bold 8px 'Press Start 2P', monospace";
    const n = f.measureText(s).width
      , i = Math.round(e - n / 2);
    f.fillStyle = "rgba(0,0,0,0.62)",
    f.fillRect(i - 4, t - 10, n + 8, 12),
    f.fillStyle = a,
    f.fillText(s, i, t)
}
function Ue() {
    const e = y.filter(t => !t.isNPC).length;
    ut.textContent = String(y.length),
    mt.textContent = e > 0 ? `Holders ${e}` : "NPC Only"
}
function Et() {
    ["Keeper", "Scout", "Miner", "Oracle", "Pilot"].forEach(t => y.push(new We({
        name: t,
        isNPC: !0
    }))),
    Ue()
}
function St(e) {
    const t = y.filter(i => i.isNPC)
      , s = new Map(y.filter(i => !i.isNPC && i.wallet).map(i => [i.wallet.toLowerCase(), i]))
      , a = e.map( (i, c) => {
        const o = i.address.toLowerCase()
          , r = s.get(o)
          , h = new We({
            name: `Holder ${c + 1}`,
            wallet: i.address,
            share: i.share,
            isNPC: !1
        });
        return r ? (h.aliveSince = r.aliveSince,
        h.revenueETH = r.revenueETH,
        h.x = r.x,
        h.y = r.y,
        h.variant = r.variant,
        h.frame = r.frame,
        h.vx = r.vx,
        h.vy = r.vy,
        k[o] = r.aliveSince) : (h.aliveSince = Number(k[o]) || performance.now(),
        k[o] = h.aliveSince),
        h
    }
    )
      , n = new Set(a.map(i => (i.wallet ?? "").toLowerCase()));
    for (const i of Object.keys(k))
        n.has(i) || delete k[i];
    Ct(k),
    y.length = 0,
    y.push(...t, ...a),
    Fe = e,
    Ue()
}
async function ee(e) {
    const t = await Qe(e, oe);
    return St(t),
    t
}
function _t(e) {
    const t = T.volume24hUsd * vt / 86400
      , s = T.tvlUsd > 0 ? Math.min(1.6, 1 + T.tvlUsd / Math.max(1, T.marketCapUsd || 1) * .2) : 1
      , a = t * e * s;
    return (Q > 0 ? a / Q : 0) / 1e3
}
async function ke(e) {
    const [t,s] = await Promise.all([st(e), Me()]);
    T = t,
    Q = s.priceUsd
}
async function Te(e) {
    clearInterval(Se),
    clearInterval(_e),
    await ke(e),
    Se = setInterval( () => {
        ee(e).catch( () => {}
        )
    }
    , Ae),
    _e = setInterval( () => {
        ke(e).catch( () => {}
        )
    }
    , 45e3)
}
function De(e) {
    const t = Math.min(e - be, 60);
    be = e,
    N.update(e),
    N.drawBackground(f),
    N.drawDecorations(f),
    y.forEach(s => {
        s.move(t),
        s.draw()
    }
    ),
    ot(f, e),
    requestAnimationFrame(De)
}
async function kt() {
    var e;
    je(),
    await Promise.all([gt(), N.init(p.width, p.height)]),
    Et(),
    nt({
        canvas: p,
        worms: y,
        decos: N.decos,
        sprites: ne,
        onLoadHolders: async t => (Ee = t,
        await Te(t),
        {
            holders: await ee(t),
            minShare: oe
        }),
        getContext: () => ({
            tokenAddress: Ee,
            holders: Fe,
            refreshMs: Ae,
            economics: T
        })
    }),
    await Te(q),
    await ee(q),
    (e = document.getElementById("loader")) == null || e.classList.add("hidden"),
    requestAnimationFrame(De)
}
window.addEventListener("resize", je);
kt();
function Tt() {
    try {
        const e = localStorage.getItem(Oe);
        if (!e)
            return {};
        const t = JSON.parse(e);
        return t && typeof t == "object" ? t : {}
    } catch {
        return {}
    }
}
function Ct(e) {
    try {
        localStorage.setItem(Oe, JSON.stringify(e))
    } catch {}
}
