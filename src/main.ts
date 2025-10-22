const quoteEl = document.getElementById("quote") as HTMLElement;
const authorEl = document.getElementById("author") as HTMLElement;
const getQuotebtn = document.getElementById("get-quote-btn") as HTMLButtonElement
const copyBtn = document.getElementById("copy-btn") as HTMLButtonElement
const shareBtnX = document.getElementById("share-btn-X") as HTMLButtonElement
const shareBtnFB = document.getElementById("share-btn-FB") as HTMLButtonElement
const shareBtnWA = document.getElementById("share-btn-WA") as HTMLButtonElement

getQuotebtn.addEventListener("click", async () => {
    getQuotebtn.textContent = "Loading..."
    getQuotebtn.disabled = true

    const quote = await fetchQuote();

    if (quote) {
        quoteEl.textContent = `"${quote.content}"`;
        authorEl.textContent = `- ${quote.author}`;
    } else {
        quoteEl.textContent = `Couldn't fetch quote`;
        authorEl.textContent = "";
    }

    getQuotebtn.textContent = "Generate Another Quote";
    getQuotebtn.disabled = false

    copyBtn.style.display = "inline-block";
    copyBtn.textContent = "Copy";
    shareBtnX.style.display = "inline-block"
    shareBtnFB.style.display = "inline-block"
    shareBtnWA.style.display = "inline-block"
})

async function fetchQuote(): Promise<{ content: string; author: string } | null> {
    try {
        const res = await fetch(`https://dummyjson.com/quotes/random`, { cache: "no-cache" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return { content: data.quote, author: data.author }
    } catch (err) {
        console.error("fetchQuote error:", err)
        return null;
    }
}

copyBtn.addEventListener("click", async () => {
    const quote = quoteEl.textContent;
    const author = authorEl.textContent;

    if (!quote || !author) return;

    await navigator.clipboard.writeText(`${quote} - ${author}`)
    copyBtn.innerHTML = `Copied! <i class="fa-solid fa-check"></i>`

    setTimeout(() => {
        copyBtn.innerHTML = `Copy <i class="fa-regular fa-copy"></i>`
    }, 5000)
})

shareBtnX.addEventListener("click", () => {
    const quote = quoteEl.textContent;
    const author = authorEl.textContent;

    if (!quote || !author) return;

    const text = `${quote} ${author}`
    const url = encodeURIComponent(text);

    window.open(`https://twitter.com/intent/tweet?text=${url}`, "_blank");
})

shareBtnFB.addEventListener("click", () => {
    const quote = quoteEl.textContent;
    const author = authorEl.textContent;

    if (!quote || !author) return;

    const text = `${quote} ${author}`
    const url = encodeURIComponent(text);

    window.open(`https://www.facebook.com/sharer/sharer.php?u=https://dummyjson.com&quote=${url}`, "_blank");
})

shareBtnWA.addEventListener("click", () => {
    const quote = quoteEl.textContent;
    const author = authorEl.textContent;

    if (!quote || !author) return;

    const text = `${quote} ${author}`
    const url = encodeURIComponent(text);

    window.open(`https://api.whatsapp.com/send?text=${url}`, "_blank");
})