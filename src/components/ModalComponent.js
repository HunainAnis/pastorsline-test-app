import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"
import Spinner from "react-bootstrap/Spinner"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { useHistory } from "react-router"
import { Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from "react-router-dom"

export const ModalComponent = ({ type, toggle, show, data, fetchMore, search, ...props }) => {
    const [ onlyEven, setOnlyEven ] =useState(false)
    const [ showDetails, setShowDetails ] = useState(false)
    const [ selectedDetails, setSelectedDetails ] = useState({})
    const [ stopFetch, setStopFetch ] = useState(false)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ searchText, setSearchText ] = useState()
    let history = useHistory()
    const { contacts } = data
    let contacts_ids = contacts && contacts?.length!==0 ? Object.keys(contacts):[]
    useEffect(()=> {
        contacts_ids = contacts && contacts?.length!==0 ? Object.keys(contacts):[]
    },[props.data])

    // const handleUpdate = (values) => {
    //     const { scrollTop, scrollHeight, clientHeight } = values;
    //     const pad = 100;
    //     const t = ((scrollTop + pad) / (scrollHeight - clientHeight));
    //     let runs = false
    //     if (!stopFetch && t > 1) {
    //         setCurrentPage(currentPage)
    //         fetchMore(type!=="A", 2)
    //     };
    // }
    const handleUpdate = (values) => {
        fetchMore(currentPage)
        setCurrentPage(currentPage+1)
        };

    const handleDetails = (data) => {
        setSelectedDetails(data)
        setShowDetails(true)
    }

    const handleSearch = (text) => {
        setSearchText(text)
        search(type!=="A",text)
    }

    return (
        <div>
            <Modal show={true} onHide={()=>history.push("/")} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {type === "A"? "All Contacts":"USA Contacts"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        showDetails ? 
                        (
                            <div>
                                <div onClick={()=>setShowDetails(false)} className='cursor-pointer mb-2'>{"<"} back to list</div>
                                <hr />
                                <div>
                                    {selectedDetails.first_name!==0 && "first_name: " + selectedDetails.first_name}
                                </div>
                                <div>
                                    {selectedDetails.email!==0 && "email: " + selectedDetails.email}
                                </div>
                            </div>
                        
                        )
                        : <>
                            <div className='d-block mx-auto mb-3 border-0'>
                                    <Button 
                                        className='ml-1' 
                                        style={{backgroundColor:"#46139f", border:"1px solid #46139f"}}
                                        onClick={()=>history.push("/ModalA")}
                                    >
                                        All Contacts
                                    </Button>
                                    <Button 
                                        className='ml-1' 
                                        style={{backgroundColor:"#ff7f50", border:"1px solid #ff7f50"}} 
                                        onClick={()=>history.push("/ModalB")}
                                    >
                                        US Contacts
                                    </Button>
                                    <Button 
                                        className='ml-1' 
                                        variant='white' style={{border:"1px solid #46139f"}}
                                        onClick={()=>history.push("/")}
                                    >
                                        Close
                                    </Button>
                            </div>
                            <div className='mb-3'>
                                <input placeholder='Search here...' className='w-100' type='text' value={searchText} onChange={(e)=> handleSearch(e.target.value)} />
                            </div>
                            {/* <Scrollbars onScrollStop={()=>{setStopFetch(true)}} onUpdate={(values)=>setTimeout(()=> handleUpdate(values) ,5000)} style={{ height: 400 }}> */}
                            <Scrollbars style={{ height: 400 }}>
                                {
                                    contacts && contacts.length!==0 && Object.keys(contacts).length!==0 && !onlyEven 
                                    ? 
                                    contacts && contacts.length!==0 && Object.keys(contacts).map(i=>(
                                        <div onClick={()=>handleDetails(contacts[i])} className='my-1 border border-dark rounded p-2 cursor-pointer' key={contacts[i].id}>
                                            {contacts[i].id}
                                        </div>
                                    ))
                                    :
                                    contacts && contacts.length!==0 && Object.keys(contacts).filter(j=>j%2===0).map(i=>(
                                        <div onClick={()=>handleDetails(contacts[i])} className='my-1 border border-dark rounded p-2 cursor-pointer'  key={contacts[i].id}>
                                            {contacts[i].id}
                                        </div>
                                    ))
                                }
                                {contacts_ids.length!==0 &&<Button onClick={(page)=>handleUpdate(page)}>
                                    Load More...
                                </Button>}
                            </Scrollbars>
                        </> 
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Form className='w-100'>
                        <Form.Check 
                            checked={onlyEven}
                            onChange={(e)=>setOnlyEven(!onlyEven)}
                            className='mr-auto float-left'
                            type='checkbox'
                            label='Only even'
                        />
                        <Button className='float-right' variant='white' style={{border:"1px solid #46139f"}}  onClick={()=>history.push("/")}>Close</Button>
                    </Form>
                </Modal.Footer>
            </Modal>
        </div>
    )
}