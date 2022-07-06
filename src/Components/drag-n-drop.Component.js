import React, {useState, useEffect, useRef} from 'react'

export default function DragNDrop({data}) {
  /*State Management Zone ################################ */
  //chosen list UserRef and useEffect hook
  var [lists, setList] = useState(data);
  
  useEffect(() => {
    setList(data);
  }, [setList, data])

  const [dragging, setDragging]=useState(false);
  let dragCardNode = useRef();
  let dragCard = useRef();




  /*Drag-n-drop Logic################################ */

  //Start To Drag a card
  const handleDragStart=(e, targetCard)=>{
    dragCard.current = null;
    dragCardNode.current = null;
    console.log('Card', targetCard.cardI+1, "from list", targetCard.listI+1)

    //connect to useRef hooks
    //add dragEnd Event Listener
    //set Dragging State    
    dragCard.current = targetCard;

    setTimeout(() => {
        setDragging(true); 
    },0)
  }

 
  //Tracks the coordinates of a card as it moves into a valid position and updates the refs with the Card Index and List Index of the item
  const handleDragEnter =(e,  targetCard)=>{
    

      //set the coordinates of your target node to the coordinates of the card you just entered
      dragCard.current = targetCard;

      console.log(targetCard)
  }


  //insert the OnStartDrag card at onDragEnter index  
  let handleDragEnd =(e, targetCard)=>{
    console.log( 'CARD', dragCard.current.cardI, ' from list', dragCard.current.listI)
    console.log( 'is choosing coordinates at card', targetCard.cardI, ' of list', targetCard.listI)

    if(targetCard !== undefined ){
      setList(oldList => {
      let newList = [...oldList]
      
      //Takes the card selected from dragStart at it's index in newList and inserts it at the index of the card set by handleDragEnter
        newList[dragCard.current.listI].cards.splice(dragCard.current.cardI, 0, newList[targetCard.listI].cards.splice(targetCard.cardI,1)[0])

        
        dragCard.current = targetCard;
        console.log(targetCard)
        return newList

      })
  }
  
  setDragging(false)
  dragCardNode.current.removeEventListener('dragend', handleDragEnd)
  console.log('end drag')      


  }    


  /*Card  Logic ################################ */
  //adds a card to a list
  
  //styling on dragged card
  const getStyles = (card) =>{
    if(dragCard.current.listI === card.listI && dragCard.current.cardI === card.cardI){
      return 'card currentCard'
    }
    return 'card'
  }
  
  const addCard = (listI) =>{
    
    //Get cardContent from a user prompt
    var cardContentInput = prompt('Card Content')
    
    //set state of cards to be cards + the new cardContnet
    setList(oldList => {
      var newList = JSON.parse(JSON.stringify(oldList)) //set

      console.log(newList[listI])
      newList[listI].cards = [...lists[listI].cards, cardContentInput] //manipulate

      return newList //return
    });
  }

  //deletes a card from a list
  const deleteCard = (cardI, listI) =>{
    //return filtered cards array without card with the passed index
    console.log(cardI)
    console.log(lists[listI])
    const newCards = lists[listI].cards.filter((cards, i)=> { return  i !== cardI})
    console.log(newCards)

    //set cards state to newCards array 
    setList(oldList =>{
      var newList = JSON.parse(JSON.stringify(oldList)) //set 

      newList[listI].cards = [...newCards] //manipulate

      return newList //return
    });
  }


    
  /*JSX Render Area ################################ */
  return (
    <div className="board">

    {/* populate lists and cards */}
    {lists.map((list, listI)=> (


      <div  className="listWrap" key={listI}>

          {/* header */}
          <div className="listHeader" key={listI}> <h1>{list.listHeader}</h1> </div>

          {/* add card button */}
          <button className='addCardButton' onClick={(e)=>addCard(listI)}> Add a Card</button>
                  
            {/* render list */}
            <div className='list' 
            onDragEnter={dragging && !list.cards.length?(e) => handleDragEnter(e,{listI, cardI :0}):null}
            onDragEnd={dragging?(e) => handleDragEnd(e, {listI, cardI:0}):null}
            >

            {/* populate cards*/}

              {list.cards.map((card, cardI)=> (
                
                <div key={cardI} 
                className={dragging?getStyles({listI, cardI}): 'card'}
                draggable 
                onDragStart={(e) => handleDragStart(e, {listI, cardI})} 
                onDragEnter={dragging?(e) => handleDragEnter(e, {listI, cardI}):null}
                onDragEnd={dragging?(e) => handleDragEnd(e, {listI, cardI}):null}
                >
                  
                  <button className='deleteCardButton' onClick={()=> deleteCard(cardI, listI)} >Delete</button>
                  {card}
                
                </div>

              ))}
            </div>

      </div>
    ))}
    
    </div>


  )
}
