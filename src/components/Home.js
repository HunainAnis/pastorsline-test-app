import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { ModalComponent } from "./ModalComponent"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Home = () => {
    const [modalA, setModalA] = useState(false)
    const [modalB, setModalB] = useState(false)
    return(
        <div className='vh-100'>
            <Row className='vh-100'>
                <Col className='vh-100'>
                    <div className='vh-100 text-center'>
                        <Link to="/ModalA">
                            <Button className='ml-1' style={{backgroundColor:"#46139f", border:"1px solid #46139f"}}  onClick={()=>setModalA(true)} className='px-5'>All Contacts</Button>
                        </Link>
                        <Link to="/ModalB">
                            <Button className='ml-1' style={{backgroundColor:"#ff7f50", border:"1px solid #ff7f50"}} onClick={()=>setModalB(true)} className='px-5'>US Contacts</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    )
}