import React, { useState, useRef } from 'react'

let onTimeOut;
const Button = ({ className, noRipple, color, opacity, scale, scaleDuration, rippleDuration, children }) => {

    const ButtonRef = useRef(null)
    const [RippleItems, setRippleItems] = useState([]);

    const ClickHandler = ({ pageX, pageY, currentTarget }) => {
        clearTimeout(onTimeOut)

        // Get the X and Y Coordinate of the clicked Position
        let x = ((pageX - currentTarget.offsetLeft) * 100) / currentTarget.offsetWidth;
        let y = ((pageY - currentTarget.offsetTop) * 100) / currentTarget.offsetHeight

        // Set the ID for the New Ripple and Add it to the Ripples state
        let ID;
        if (RippleItems.length > 0) {
            ID = RippleItems.length + 1
        } else ID = 1
        const NewRippleItem = { id: ID, left: `${Math.round(x)}%`, top: `${Math.round(y)}%` }
        setRippleItems([...RippleItems, NewRippleItem])

        // Remove Ripple after a few seconds
        onTimeOut = setTimeout(() => {
            if (RippleItems) {
                const RemovableObjectIndex = RippleItems.findIndex((obj) => obj.id === ID);
                if (RemovableObjectIndex > -1) {
                    setRippleItems(RippleItems.splice(RemovableObjectIndex, 1))
                } else setRippleItems([]);
            }
        }, 2000)
    }

    return (
        <button ref={ButtonRef} onClick={ClickHandler}
            style={{
                '--active-scale': scale ? scale : '0.98',
                '--active-scale-duration': scaleDuration ? scaleDuration + 's' : '0.25s',
                '--active-ripple-duration': rippleDuration ? rippleDuration + 's' : '1s'
            }}
            className={`RippleBtn ${className && className}`}>
            {!noRipple && RippleItems && RippleItems?.map(item => {
                return <span
                    key={item.id}
                    className='RippleSpan'
                    style={{
                        left: item.left, top: item.top,
                        maxWidth: ButtonRef.current ? ButtonRef.current.clientWidth * 2 : 'auto',
                        maxHeight: ButtonRef.current ? ButtonRef.current.clientWidth * 2 : 'auto',
                        background: color ? color : `rgba(255,255,255, ${opacity ? opacity : '0.7'})`
                    }}
                />
            })}
            {children}
        </button>
    )
}

export default Button