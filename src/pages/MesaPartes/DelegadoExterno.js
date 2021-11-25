import React from 'react'
import { useParams } from "react-router";

export default function DelegadoExterno() {
    let {detalle} = useParams()
    return (
        <div>
            {detalle}
        </div>
    )
}
