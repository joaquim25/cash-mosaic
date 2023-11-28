import React from 'react'
import styled from 'styled-components'

const LoadingErrorContainer = styled.div`
    // min-height: 300px;
`

function DataLoadingError() {
    return (
        <LoadingErrorContainer>
            <p style={{ textAlign: 'center' }}>An error ocurred trying to load your data, please refresh the page and try again</p>
        </LoadingErrorContainer>
    )
}

export default DataLoadingError