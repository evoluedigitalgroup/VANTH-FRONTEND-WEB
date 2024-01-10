import { ZOOM, Plugin, Schema } from "@pdfme/common"
import SignaturePad from 'signature_pad';
import { image } from "@pdfme/schemas"


const getEffectiveScale = (element) => {
    let scale = 1;
    while (element && element !== document.body) {
        const style = window.getComputedStyle(element);
        const transform = style.transform;
        if (transform && transform !== 'none') {
            const localScale = parseFloat(transform.match(/matrix\((.+)\)/)?.[1].split(', ')[3] || '1');
            scale *= localScale;
        }
        element = element.parentElement;
    }
    return scale;
}

export const signature = {
    ui: async (props) => {
        const { schema, value, onChange, rootElement, mode } = props;

        const canvas = document.createElement('canvas');
        canvas.width = schema.width * ZOOM;
        canvas.height = schema.height * ZOOM;
        const resetScale = 1 / getEffectiveScale(rootElement);
        canvas.getContext('2d').scale(resetScale, resetScale);

        const signaturePad = new SignaturePad(canvas);
        try {
            value ? signaturePad.fromDataURL(value, { ratio: resetScale }) : signaturePad.clear();
        } catch (e) {
            console.error(e);
        }

        if (mode === 'viewer') {
            signaturePad.off();
        } else {
            signaturePad.on();
            const clearButton = document.createElement('button');
            clearButton.style.position = 'absolute';
            clearButton.style.zIndex = '1';
            clearButton.textContent = 'x';
            clearButton.addEventListener('click', () => {
                onChange && onChange('');
            });
            rootElement.appendChild(clearButton);
            signaturePad.addEventListener('endStroke', () => {
                console.log('signaturePad : ', signaturePad);
                const data = signaturePad.toDataURL('image/png');
                onChange && data && onChange(data);
            });
        }
        rootElement.appendChild(canvas);
    },
    pdf: image.pdf,
    propPanel: {
        schema: {},
        defaultValue: 'data:image/png;base64,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',
        defaultSchema: {
            type: 'signature',
            position: { x: 0, y: 0 },
            width: 50,
            height: 15
        }
    },
}