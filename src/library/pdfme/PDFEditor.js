import React, { useState, useEffect, useRef } from "react";
import { text, image, barcodes } from '@pdfme/schemas';
import { Designer, Form, Viewer } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
import { signature } from './signaturePlugin';


const PDFEditor = ({ basePdf, onReadyForSignature }) => {
    const editorRef = useRef(null);
    const designerRef = useRef(null);
    const [updatedPdf, setUpdatedPdf] = useState(null);
    const blankTemplate = { basePdf: basePdf, schemas: [] };

    const [template, setTemplate] = useState(blankTemplate);

    useEffect(() => {
        if (editorRef.current && template.basePdf) {
            designerRef.current = new Designer({
                domContainer: editorRef.current,
                template,
                options: {
                    labels: {
                        fieldsList: 'Lista de Campos',
                        addNewField: 'Adicionar novo campo',
                        editField: 'editar campo',
                        bulkUpdateFieldName: 'Atualizar nomes de campos em massa',
                        cancel: 'Cancelar',
                        commitBulkUpdateFieldName: 'Salvar alterações',
                        type: 'Tipo',
                        align: 'Alinhar',
                        width: 'Largura',
                        height: 'Altura',
                        opacity: 'Opacidade',
                        rotate: 'Rotacionar',
                        fieldName: 'Nome',
                    },
                },
                plugins: {
                    signature
                },
            });


        }
    }, [template.basePdf]);

    const savePDF = async () => {
        let currentRef = designerRef.current

        let templates = {
            previewFile: null,
            usableFile: null,
            schema: null
        }

        const latestTemplate = await currentRef.getTemplate();

        const newTemplate = { ...latestTemplate };

        const previewInputs = latestTemplate?.sampledata ?? [];

        const previewFile = await generate({
            template: latestTemplate,
            inputs: previewInputs,
            plugins: {
                signature
            }
        });

        newTemplate.schemas = newTemplate.schemas.map((schema, i) => {
            const newSchema = { ...schema };
            if (Object.keys(schema).length === 0) return newSchema;
            let returnSchema = {};
            Object.entries(schema).forEach(([fieldName, value], index) => {
                value.type = 'text'
                value.fontColor = '#FFFFFF'
                returnSchema = {
                    ...returnSchema,
                    [fieldName]: value
                };
            });
            return returnSchema;
        });

        newTemplate.sampledata = newTemplate.sampledata.map((field, i) => {
            const fieldKeys = Object.keys(field);
            const newField = {};
            fieldKeys.forEach((key) => {
                newField[key] = '###SIGN_HERE###';
            });
            return newField;
        });

        const usableInputs = newTemplate?.sampledata ?? [];

        const usableFile = await generate({
            template: newTemplate,
            inputs: usableInputs,
            plugins: {
                text
            }
        })

        console.log(previewFile);
        const previewFileBlob = new Blob([previewFile.buffer], { type: "application/pdf" });
        previewFileBlob.lastModifiedDate = new Date();
        previewFileBlob.name = "preview-contract.pdf";
        // window.open(URL.createObjectURL(previewFileBlob));
        templates.previewFile = previewFileBlob;

        console.log(usableFile);
        const usableFileBlob = new Blob([usableFile.buffer], { type: "application/pdf" });
        usableFileBlob.lastModifiedDate = new Date();
        usableFileBlob.name = "contract.pdf";
        templates.usableFile = usableFileBlob;

        templates.schema = newTemplate?.schemas ?? [];

        // window.open(URL.createObjectURL(blob));
        onReadyForSignature(templates);

    };

    return (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <button onClick={savePDF}>
                        Save PDF
                    </button>
                </div>
            </div> */}
            {
                !updatedPdf ? (
                    <div style={{ display: 'flex', flex: 1 }} ref={editorRef}>
                        {
                            template.basePdf && !updatedPdf ? (
                                <div>Editor is loading...</div>
                            ) : null
                        }
                    </div>
                ) : null
            }
            {
                updatedPdf ? (
                    <iframe src={URL.createObjectURL(new Blob([updatedPdf], { type: 'application/pdf' }))} width="100%" height="100%" />
                ) : null
            }
            <div className="d-flex align-items-center justify-content-end mt-4">
                <button
                    type="button"
                    onClick={savePDF}
                    className=" px-4 py-2"
                    style={{
                        fontSize: "14px",
                        border: "1px solid #0068FF",
                        color: "#FFFFFF",
                        background: "#0068FF",
                        borderRadius: "6px",
                        fontWeight: 700,
                    }}
                >
                    Prosseguir para assinatura
                </button>
            </div>
        </div>
    );
};

export default PDFEditor;