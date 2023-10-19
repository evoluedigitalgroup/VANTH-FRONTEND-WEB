import React from 'react'
import { Button, Col } from 'react-bootstrap'

const CnpjCard = ({ formValues }) => {
    return (
        <>
            <Col md={3} xs={12}>
                <h6 style={{ color: "#B5B6B7" }}>CNPJ</h6>
                {formValues.CNPJ ? (
                    <Button
                        className='w-100 p-0 CardBtn'
                        variant='outline-success'>
                        <i className='bi bi-check-lg fs-1 right-icon'></i>
                        <h6
                            style={{
                                color: "#C4CCD2",
                                fontSize: "11px",
                            }}>
                            Já aprovada, visualizar?
                        </h6>
                    </Button>
                ) : (
                    <Button
                        className='w-100 p-0 CardBtn'
                        variant='outline-secondary'>
                        <label
                            style={{
                                rotate: "45deg",
                            }}>
                            <i className='bi bi-paperclip fs-1 link-icon'></i>
                        </label>
                        <h6
                            style={{
                                color: "#C4CCD2",
                                fontSize: "11px",
                            }}>
                            Arraste e solte aqui ou importe dos seus arquivos
                        </h6>
                    </Button>
                )}
            </Col>
        </>
    )
}

export default CnpjCard
