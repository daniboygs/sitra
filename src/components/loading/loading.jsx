import React from 'react';
import Loader from 'react-loader-spinner';
import './style/style.css';

const Loading = () => {
    return (
        <div className='loading' style={{textAlign:'center'}}>
            {/*<h2 style={{textAlign: 'center', fontFamily: 'LabradorA', color: '#C09F77', margin: '0 auto', zIndex: '100', display: 'flex'}}>Cargando...</h2>*/}
            <Loader
                type="TailSpin"
                color="#C09F77"
                height="200"
                width="200"
                style={{ margin:'0 auto' }}
            />
        </div>
    );
}
export default Loading;