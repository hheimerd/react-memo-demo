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
            {changeable % 2 === 0 ? <MemoComponent1 key={1}/> : <MemoComponent2 key={2}/>}
            <div>
                {changeable % 2 === 0 ? <MemoComponent2 key={2}/> : <MemoComponent1 key={1}/>}
            </div>
            <button onClick={() => setChangeable(changeable + 1)}>change</button>
        </ColoredBlock>
    )
}

const MemoWrapper = memo(({unchangeable}) => {
    return (
        <ColoredBlock>
            <PureComponent prop={unchangeable}/>
            <PureComponent prop={unchangeable}/>
            <WithInnerState/>
        </ColoredBlock>
    )
})
MemoWrapper.displayName = 'MemoWrapper';

const MemoComponent2 = memo(() => {
    console.log('render 2');
    return <ColoredBlock/>
})
MemoComponent2.displayName = 'MemoComponent2';

const MemoComponent1 = memo(() => {
    console.log('render 1');
    return <ColoredBlock/>
})
MemoComponent1.displayName = 'MemoComponent1';

function WithInnerState() {
    const [innerState, setInnerState] = useState(0);
    const memoized = useMemo(() => <PureComponent/>, []);

    return (
        <ColoredBlock>
            {memoized}
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
