import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import fs from '../../assets/icons/fs.png';
import fns from '../../assets/icons/fns.png';
import vs from '../../assets/icons/vs.png';
import vns from '../../assets/icons/vns.png';
import is from '../../assets/icons/is.png';
import ins from '../../assets/icons/ins.png';
import hs from '../../assets/icons/hs.png';
import hns from '../../assets/icons/hns.png';

class NavbarComponent extends React.Component{

    constructor(props){
        super(props);
        this.state={
            pathname: '/'
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount(){
        switch(window.location.pathname){
            case '/denuncias':
                this.setState({
                    pathname: 'denuncias'
                });
                break;
            case '/victimas':
                this.setState({
                    pathname: 'victimas'
                });
                break;
            case '/imputados':
                this.setState({
                    pathname: 'imputados'
                });
                break;
            case '/inicio':
                this.setState({
                    pathname: 'inicio'
                });
                break;
            default:
                this.setState({
                    pathname: '/'
                });
        }
    }

    onClick = (section) => {
        switch(section){
            case 'denuncias':
                this.setState({
                    pathname: 'denuncias'
                });
                break;
            case 'victimas':
                this.setState({
                    pathname: 'victimas'
                });
                break;
            case 'imputados':
                this.setState({
                    pathname: 'imputados'
                });
                break;
            case 'inicio':
                this.setState({
                    pathname: 'inicio'
                });
                break;
            default:
                this.setState({
                    pathname: '/'
                });
        }
    }
  
    render() {
        return (
            <Navbar className="navbar" collapseOnSelect style={{backgroundColor: '#152F4A'}}>
                <ul className="navbar-nav mr-auto">
                    <li><Link to='/' className="nav-link custom">{this.state.pathname=='/'?<img src={hs} width='140px' height='60px'/>:<img src={hns} onClick={() => this.onClick('/')} width='140px' height='60px'/>}</Link></li>
                    <li><Link to='/inicio' className="nav-link custom">{this.state.pathname=='inicio'?<img src={hs} width='140px' height='60px'/>:<img src={hns} onClick={() => this.onClick('inicio')} width='140px' height='60px'/>}</Link></li>
                    <li><Link to='/denuncias' className="nav-link custom">{this.state.pathname=='denuncias'?<img src={fs} width='140px' height='60px'/>:<img src={fns} onClick={() => this.onClick('denuncias')} width='140px' height='60px'/>}</Link></li>
                    <li><Link to='/victimas' className="nav-link custom">{this.state.pathname=='victimas'?<img src={vs} width='140px' height='60px'/>:<img src={vns} onClick={() => this.onClick('victimas')} width='140px' height='60px'/>}</Link></li>
                    <li><Link to='/imputadis' className="nav-link custom">{this.state.pathname=='imputados'?<img src={is} width='140px' height='60px'/>:<img src={ins} onClick={() => this.onClick('imputados')} width='140px' height='60px'/>}</Link></li>
                    <li><Link to='/binnacle' className="nav-link custom">Bitacora</Link></li>
                </ul>
            </Navbar>
        );
    }
}
  
export default NavbarComponent;