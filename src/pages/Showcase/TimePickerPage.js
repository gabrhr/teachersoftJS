import React from 'react'
import { Controls } from '../../components/controls/Controls'


export default function TimePickerPage() {
    return (
        <div>
            <Controls.RangeTimePicker/>
            <div style={{marginBottom:"600px"}}/>
        </div>
    )
}
