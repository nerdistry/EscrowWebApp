import React from 'react'
import { Container } from 'reactstrap'
import '../../styles/common_section.css'

const CommonSection = ({title}) => {
  return (
    
    <section className="common_section">
        <Container classname='text-center'>
            <h1>{title}</h1>
        </Container>
    </section>
  )
}

export default CommonSection