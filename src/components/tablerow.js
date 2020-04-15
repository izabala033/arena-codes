import React, { useState, useRef, useEffect } from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import { FaClipboardCheck } from "react-icons/fa"
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Popover from 'react-bootstrap/Popover'
import CardLink from './cardlink'

const CARDRE = /\[\[([^\]]+)\]\]/g;
const SCRYFALL = 'https://scryfall.com/search?q='

const TableRow = ({ data }) => {
  const [copied, setCopied] = useState('copy')
  const [show, setShow] = useState(false)
  const [description, setDescription] = useState(data.Description)
  const target = useRef(null)

  useEffect(() => {
    let cardDetect = data.Description.match(CARDRE)
    if (cardDetect) {
      let tempString = cardDetect[0]
      console.log('temp string', tempString)
      tempString = tempString.replace('[[', '')
      tempString = tempString.replace(']]', '')
      let searchURL = SCRYFALL + tempString
      setDescription(<div><a href={searchURL}>{tempString}</a> card style</div>)
    } else {
      setDescription(data.Description)
    }
  }, [])

  function CopyToClipboard() {
    setShow(true)
    setTimeout(()=>{setShow(false)},1000)
    navigator.clipboard.writeText(data.Code).then(() => {
      setCopied('Copied to Clipboard')
    }).catch(()=>{
      setCopied('There has been an error')
    })
  }

  function renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Copied to Clipboard
      </Tooltip>
    )
  }
  
  function renderNothing() {
    return <div></div>
  }

  

  return (
    <tr>
      <td>
        {data.Code}
        <OverlayTrigger placement="right" trigger="click" overlay={show ? renderTooltip : renderNothing}>
          <Button ref={target} style={{float: 'right'}}size="sm" variant="outline-primary" onClick={CopyToClipboard}>
            <FaClipboardCheck />
          </Button>     
        </OverlayTrigger>
      </td>
      <td>{description}</td>
      <td>{data.Expiry}</td>
      <td>{data.Date_Added}</td>
    </tr>
  )
}

export default TableRow
