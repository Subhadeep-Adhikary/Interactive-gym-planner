import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url,
).toString();

export const pdfreader = async (pdf) => {
    if (!pdf) {
        throw new TypeError("A PDF file is required");
    }

    const data = pdf instanceof Blob
        ? new Uint8Array(await pdf.arrayBuffer())
        : pdf;
    const document = await pdfjsLib.getDocument({ data }).promise;
    const pages = [];

    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
        const page = await document.getPage(pageNumber);
        const content = await page.getTextContent();
        const pageText = content.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ")
            .trim();

        pages.push(pageText);
    }

    return pages.filter(Boolean).join("\n\n");
};
