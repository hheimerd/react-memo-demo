import React, {useState, useMemo} from 'react';
import cn from 'classnames'
import ReactDOM from 'react-dom/client'
import './index.css'

function useRerenderColorClass() {
    let className = 'red';
    useMemo(() => className = 'green', []);

    return className;
}

function CompRoot() {
    const [changeable, setChangeable] = useState(0);
    const unchagneable = 0;

    const className = useRerenderColorClass()

    return (
        <div className={cn(className, 'block')}>
            {changeable}
            <PureComponent prop={changeable}/>
            <PureComponent prop={unchagneable}/>
            <button onClick={() => setChangeable(changeable + 1)}>change</button>
        </div>
    )
}

function PureComponent() {
    const className = useRerenderColorClass()
    return <div className={cn(className, 'block')}></div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CompRoot />
    </React.StrictMode>,
)
