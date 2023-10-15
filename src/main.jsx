/* eslint-disable react/prop-types */
import React, {useState, useMemo, memo} from 'react';
import cn from 'classnames'
import ReactDOM from 'react-dom/client'
import './index.css'


function CompRoot() {
    const [changeable, setChangeable] = useState(0);
    const unchangeable = 0;

    return (
        <ColoredBlock>
            {changeable}
            <PureComponent prop={changeable}/>
            <MemoComponent unchangeable={unchangeable}/>
            <button onClick={() => setChangeable(changeable + 1)}>change</button>
        </ColoredBlock>
    )
}

const MemoComponent = memo(({unchangeable}) => {
    return (
        <ColoredBlock>
            <PureComponent prop={unchangeable}/>
            <PureComponent prop={unchangeable}/>
            <WithInnerState/>
        </ColoredBlock>
    )
})
MemoComponent.displayName = 'MemoComponent';

function WithInnerState() {
    const [innerState, setInnerState] = useState(0);

    return (
        <ColoredBlock>
            <button onClick={() => setInnerState(innerState + 1)}>change inner state</button>
        </ColoredBlock>
    )
}

function PureComponent() {
    return <ColoredBlock></ColoredBlock>
}

function ColoredBlock(props) {
    const className = useBlockClassName()
    return <div {...props} className={cn(className, props.className)}></div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CompRoot />
    </React.StrictMode>,
)



function useBlockClassName() {
    let className = 'red';
    useMemo(() => className = 'green', []);

    return cn(className, 'block');
}
