import yabbcode from 'ya-bbcode'

const parser = new yabbcode();
parser.registerTag('align', {
    type: "replace",
    open: function (direction) {
        return `<div style="text-align: ${direction}">`
    },
    close: function () {
        return "</div>"
    }
})
parser.registerTag('center', {
    type: "replace",
    open: function () {
        return `<div style="text-align: center">`
    },
    close: function () {
        return "</div>"
    }
})
parser.registerTag('color', {
    type: "replace",
    open: function (color) {
        return `<div style="color: ${color}">`
    },
    close: function () {
        return "</div>"
    }
})

export function convertToHtml(bbcode: string) {
    const html = parser.parse(bbcode);
    return html
}