import React, { Component } from 'react';
import { Tabs, Card, Spin } from 'antd';
import { Table, Button, Modal, Input, message} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from "axios";
import Icon, { EditOutlined, DeleteOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import {API_BASE_URL} from '../../constant'
import { post } from 'jquery';

class Parametre extends Component {

  state = {
      loading: false,
      visible: false,
      loadings: [],
      open: false,
      marques :false,
      listAssures: [],
      openModalForUpd: false,
      currentAssur: {},
      currentAssureur: {},
      openModal:false,
      isLoad: false,
      AssureursLoad: false,
      listAssureurs: [],
      openModalForUpdAssureurs: false,
      listUser: [],
      userLoad: false,
      openassureModalForDel: false,
      itemSelected: {},
      currentUser: {},
      currentMarque:{},
      listMarque : [],
      visibles: false,
      openModalForUpdAssure:false,
      openModalForUpdAssures:false
  };

 
  componentDidMount() {
    this.getAllAssures();
    this.getAllAssureurs();
    this.getAllUsers();
    this.getAllMarque();
  }
    
  openModal = (openModal) => {
    this.setState({openModal});
  }

  getAllAssures(){
    axios.get(API_BASE_URL  + '/assures')
        .then(res=>{
            this.setState({listAssures: res.data, isLoad: true});
        });
  }

  getAllMarque(){
    axios.get(API_BASE_URL  + '/marque')
        .then(res=>{
            this.setState({listMarque: res.data, isLoad: true});
        });
  }

  getAllUsers(){
    axios.get(API_BASE_URL  + '/users')
        .then(res=>{
            this.setState({listUser: res.data, isLoad: true});
        });
  }

  getAllAssureurs(){
    axios.get(API_BASE_URL  + '/assureurs')
      .then(res=>{
          this.setState({listAssureurs: res.data, AssureursLoad: true});
      });

  }

// Creer un assureur

  CreateNewAssurreur = (e) => {
    this.setState({loading: true})
    e.preventDefault();
    const warning200 = () => {
      message.success('Succès','Enregistrement effectué avec succès !!!');
    };

    const warning = () => {
      message.warning('Erreur','Enregistrement echoué !!!');
    };

    const warning400 = () => {
      message.warning('Erreur coté client !!!');
    };
    const data = new FormData(e.target);
    var item = { 
      name:data.get('name'),
      username:data.get('username'),
      email:data.get('email'),
      password:data.get('password'),
    }
  
    let pword = document.getElementById("input_pword").value; 
      let confirme_pword = document.getElementById("input_confirme_pword").value;
      if (pword != confirme_pword){
          this.openNotificationWithIcon('error','Erreur','Mot de passe non identique!!!');
          return ;
      }

    axios.post(API_BASE_URL  + '/auth/signup',item)
        .then(response => {
            if (response.data){
              warning200();
              window.location.href="/parametre"
              this.openModal();
                this.setState({isLoad:true})
                this.getAllUsers();            
            }else
              warning();  
            this.openModal();
        })
        .catch(error=> {
            warning400();
        });
  };

  selectCurrentItem = (item) =>{
      this.setState({currentItem:item})
      this.showModal(true)
  }

  //  Marque
  
  addMarque = (e) => {
    this.setState({loading: true})
    e.preventDefault(); 
    const warning200 = () => {
      message.success('Succès','Enregistrement effectué avec succès !!!');
    };
    const warning = () => {
      message.warning('Erreur','Enregistrement echoué !!!');
    };
    const warning400 = () => {
      message.warning('Erreur coté client !!!');
    };
    const data = new FormData(e.target);
    var item = { 
        name:data.get('marque'), 
        description:data.get('descriptionMarque'),     
    }
    axios.post(API_BASE_URL  + '/marque',item)
        .then(response => {
            if (response.data){
               warning200();
               window.location.href="/parametre"
               this.hideModal1();
               this.setState({isLoad:true})
               this.getAllMarque();    
            }else
              warning();  
            this.hideModal1();
        })
        .catch(error=> {
            warning400();
        });
  };

  addAssures = (e) => {
    this.setState({loading: true})
    e.preventDefault(); 
    const warning200 = () => {
      message.success('Succès','Enregistrement effectué avec succès !!!');
    };

    const warning = () => {
      message.warning('Erreur','Enregistrement echoué !!!');
    };

    const warning400 = () => {
      message.warning('Erreur coté client !!!');
    };
    const data = new FormData(e.target);
    var item = { 
        name:data.get('nomAssure'), 
        description:data.get('descriptionAssure'),
  
    }
    axios.post(API_BASE_URL  + '/assures',item)
        .then(response => {
            if (response.data){
               warning200();
               window.location.href="/parametre"
               this.hideAssuresModal();
                this.setState({isLoad:true})
                this.getAllAssures();
                
            }else
              warning();  

            this.hideAssuresModal();

        })
        .catch(error=> {
            warning400();
        });
  };


addAssureurs = (e) => {
  this.setState({loading: true})
  e.preventDefault(); 
  const warning200 = () => {
    message.success('Succès','Enregistrement effectué avec succès !!!');
  };

  const warning = () => {
    message.warning('Erreur','Enregistrement echoué !!!');
  };

  const warning400 = () => {
    message.warning('Erreur coté client !!!');
  };
  const data = new FormData(e.target);
  var item = {  
      name:data.get('nomAssureur'), 
      description:data.get('descriptionAssureur'),
      address: data.get('address'),  
  }
  axios.post(API_BASE_URL + '/assureurs', item)
      .then(response => {
          if (response.data){
             warning200();
             window.location.href="/parametre"
              this.setState({isLoad:false})
              this.getAllAssureurs();
              this.hideAssureursModal();
          }else
            warning();  

          this.hideAssureursModal();

      })
      .catch(error=> {
          warning400();
      });
};

//----------------OUVERTURE ET FERMETURE DES MODALES---------------
openAssuresModal = () => {
  this.setState({
      open: true,
  })
};
hideAssuresModal = () => {
    this.setState({
        open: false,
    })
}

  openModalMarque = () => {
  this.setState({
    marques: false,
  })
}

  openAssureursModal = () => {
    this.setState({visible: true});
};

  hideAssureursModal = () => {
    this.setState({visible: false});
};

closeModalForUp = () => {
    this.setState({openModalForUpd: false});
};

openModalUpdAssureurs = () => {
  this.setState({openModalForUpdAssureurs: true});
};

hideModalUpdAssureurs = () => {
  this.setState({openModalForUpdAssureurs: false});
};

openAssuresModal = () => {
  this.setState({
      open: true,
  })
};

hideAssuresModal = () => {
    this.setState({
        open: false,
    })
}

showModal = () => {
this.setState({
  visible: true,
});
};

openModalDeleteAssures = () => {
  this.setState({
      openassureModalForDel: true,
  })
}

closeModalDeleteAssures = () => {
  this.setState({
      openassureModalForDel: false,
  })
}

// FUNCTION UPDATE USER

updateData = e => {
  this.setState({loading: true})
  e.preventDefault();
  const warning200 = () => {
    message.success('Succès','Modification effectué avec succès !!!');
  };
  const warning = () => {
    message.warning('Erreur','Enregistrement echoué !!!');
  };

  const warning400 = () => {
    message.warning('Erreur coté client !!!');
  };

  let data = this.state.currentUser
  axios.post(API_BASE_URL +'/users/upd',data, {
      headers: { Authorization: "Bearer" + localStorage.getItem('token')}
  })
      .then(response => {
          if (response){
            warning200();
            this.getAllUsers()
            window.location.href="/parametre"
            window.location.reload();
              // this.openNotificationWithIcon('success','Succès','Modification effectuée avec succès !!!')
          }else
          warning();
              // this.openNotificationWithIcon('error','Erreur','Modification echouée !!!')

          this.openModalForUpd(false)
      })
      .catch(error=> {
          warning400();
          this.openModalForUpd(false)
          // this.openNotificationWithIcon('error','Erreur','Erreur coté client !!!')
      });
  }

handleChange = (e)  => {
  let {name, value} = e.target //
  this.setState(state => {
      const newState = { ...state, currentUser: {...state.currentUser, [name]:value}} // Ici je demande a me ramener les anciennes valeurs pour pouvoir l'ecrasser par la nouvelle valeur
      return newState // Recuperation de la new valeur
  })
}

openModalForUpd(openModalForUpd){
  if (openModalForUpd){
      this.setState({openModalForUpd});
  }
  else{

      this.setState({openModalForUpd});
  }
}

selectForUpdate =(item)=>{
  this.setState({currentUser: item, openModalForUpd:true}) // Recuperation de la ligne
}

// FUCTION UPD ASSURER

updateDataAssure = e => {
  this.setState({loading: true})
  e.preventDefault();
  const warning200 = () => {
    message.success('Succès','Modification effectué avec succès !!!');
  };
  const warning = () => {
    message.warning('Erreur','Enregistrement echoué !!!');
  };

  const warning400 = () => {
    message.warning('Erreur coté client !!!');
  };

  let newdata = this.state.currentAssur;

  axios.post(API_BASE_URL + '/assures',newdata, {
      headers: { Authorization: "Bearer" + localStorage.getItem('token')}
  })
      .then(response => {
          if (response){
            warning200();
            window.location.href="/parametre"
            this.getAllAssures();
            window.location.reload();
          }else
          warning();
          this.openModalForUpdAssure(false)
      })
      .catch(error=> {
          warning400()
          this.openModalForUpdAssure(false)
      });
}
openModalForUpdAssure(openModalForUpdAssure){
  if (this.openModalForUpdAssure){
      this.setState({openModalForUpdAssure});
  }
  else{
      
      this.setState({openModalForUpdAssure});
  }
}

//======== Selectionner les valeurs et modifier dans le input ===
handleChangeAssure = (e)  => {
  let {name, value} = e.target //
  this.setState(state => {
      const newState = { ...state, currentAssur: {...state.currentAssur, [name]:value}} // Ici je demande a me ramener les anciennes valeurs pour pouvoir l'ecrasser par la nouvelle valeur
      return newState // Recuperation de la new valeur
  })
}
// Comment la ligne
selectForUpdateAssure =(item)=>{
  this.setState({currentAssur: item, openModalForUpdAssure:true}) // Recuperation de la ligne 
  
}
//========================FUNCTION UPDATE ASSUREUR ===========================================
updateDataAssureurs = e => {
  this.setState({loading: true})
  e.preventDefault();
  const warning200 = () => {
    message.success('Succès','Modification effectué avec succès !!!');
  };
  const warning = () => {
    message.warning('Erreur','Enregistrement echoué !!!');
  };

  const warning400 = () => {
    message.warning('Erreur coté client !!!');
  };

  let newdata = this.state.currentAssureur;

  axios.post(API_BASE_URL + '/assureurs',newdata, {
      headers: { Authorization: "Bearer" + localStorage.getItem('token')}
  })
      .then(response => {
          if (response){
            warning200();
            window.location.href="/parametre"
            this.getAllAssureurs();
            window.location.reload();

          }else
            warning();
            this.hideModalUpdAssureurs(false)
      })
      .catch(error=> {
            warning400();
            this.hideModalUpdAssureurs(false)
      });
}
openModalForUpdAssures(openModalForUpdAssures){
  if (openModalForUpdAssures){
      this.setState({openModalForUpdAssures});
  }
  else{
      
      this.setState({openModalForUpdAssures});
  }
}

//======== Selectionner les valeurs et modifier dans le input ===
handleChangeAssureur = (e)  => {
  let {name, value} = e.target //
  this.setState(state => {
      const newState = { ...state, currentAssureur: {...state.currentAssureur, [name]:value}} // Ici je demande a me ramener les anciennes valeurs pour pouvoir l'ecrasser par la nouvelle valeur
      return newState // Recuperation de la new valeur
  })
}
// Comment la ligne
selectForUpdateAssureur =(item)=>{
  this.setState({currentAssureur: item, openModalForUpdAssureurs:true}) // Recuperation de la ligne  
}

 //========================FUNCTION UPDATE MARQUE ===========================================
 updateDataMarque = e => {
  this.setState({loading: true})
  e.preventDefault();
  const warning200 = () => {
    message.success('Succès','Modification effectué avec succès !!!');
  };
  const warning = () => {
    message.warning('Erreur','Enregistrement echoué !!!');
  };

  const warning400 = () => {
    message.warning('Erreur coté client !!!');
  };
  let newdata = this.state.currentMarque
  axios.post(API_BASE_URL + '/marque',newdata, {
      headers: { Authorization: "Bearer" + localStorage.getItem('token')}
    })
      .then(response => {
          if (response){
            warning200();
            window.location.href="/parametre"
            this.getAllMarque();
              // this.openNotificationWithIcon('success','Succès','Modification effectuée avec succès !!!')
            window.location.reload();
            }else
              // this.openNotificationWithIcon('error','Erreur','Modification echouée !!!')
            warning();
          this.openModalForUpdMarque(false)
      })
      .catch(error=> {
          warning400();
          // this.openNotificationWithIcon('error','Erreur','Erreur coté client !!!')
      });
}
openModalForUpdMarque(openModalForUpdMarque){
  if (openModalForUpdMarque){
      this.setState({openModalForUpdMarque});
  }
  else{
      this.setState({openModalForUpdMarque});
  }

}

//======== Selectionner les valeurs et modifier dans le input ===
handleChangeMarque = (e)  => {
  let {name, value} = e.target //
  this.setState(state => {
      const newState = { ...state, currentMarque: {...state.currentMarque, [name]:value}} // Ici je demande a me ramener les anciennes valeurs pour pouvoir l'ecrasser par la nouvelle valeur
      return newState // Recuperation de la new valeur
  })
}
// Comment la ligne
selectForUpdateMarque =(item)=>{
  this.setState({currentMarque: item, openModalForUpdMarque:true}) // Recuperation de la ligne 
}

//  MARQUE

  showModal1 = () => {
    this.setState({
      visibles: true,
    });
  };

  hideModal1 = () => {
    this.setState({
      visibles: false,
    });
  };

    render(){
      
      const {currentAssur,visible, loading, isLoad, AssureursLoad, listAssureurs, Assureurs, currentAssureur, itemSelected} = this.state;
        const { TabPane } = Tabs;

  
        return (
        <div className="container-fluid pl-4 m-0 text-left" style={{backgroundColor:"white"}}>

            <Tabs>
                <TabPane tab="Profil utilisateur" key="1">
                <div>
                      <div className="float-right">
                        <Button type="primary" onClick={this.openModal}>
                            <PlusOutlined style={{color:"white"}}/> Ajouter
                        </Button><br/><br/><br></br>
                      </div>

                      {isLoad?(
                      <table className='table table-striped' width='100%'>
                      
                        <thead>
                          <tr>
                            <th>IDENTIFIANT</th>
                            <th>NOM PRENOM</th>
                            <th>EMAIL</th>
                            <th>ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                            {this.state.listUser.map((users, index)=>
                                    <tr key={index}>
                                      <td>{users.username}</td>
                                      <td>{users.name}</td>
                                      <td>{users.email}</td>
                                      <td>
                                        <i class='far fa-edit' style={{cursor:"pointer"}} onClick={() =>this.selectForUpdate(users)}></i>
                                      </td>
                                    </tr>
                                    )}
                        </tbody>
                      </table>
                      ):(
                        <Spin/>
                      )
                      }
                  
                </div>
                </TabPane>
                <TabPane tab="Assurés" key="2">
                  <div>
                    <div className="float-right">
                        <Button type="primary" onClick={this.openAssuresModal}>
                          <PlusOutlined style={{color:"white"}}/>Ajouter
                        </Button><br/><br/><br/>
                    </div>

                    {isLoad?(
                    <table className='table table-striped' width='100%'>
                   <thead>
                      <tr>
                        <th>NOM</th>
                        <th>DESCRIPTION</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                   <tbody>
                      {this.state.listAssures.map((list, index)=>
                              <tr key={index}>
                                  <td>{list.name}</td>
                                  <td>{list.description}</td>
                                  <td>
                                    <i class='far fa-edit' style={{cursor:"pointer"}} onClick={()=>this.selectForUpdateAssure(list)}></i>
                                  </td>
                              </tr>
                              )}
                   </tbody>
                    </table>
                    ):(
                      <Spin/>
                    )}
                   
                   {/* {isLoad?(<Table dataSource={dataSource} columns={columns}/>):(<Spin/>)} */}
              
                  </div>
                </TabPane>
                <TabPane tab="Assureurs" key="3">
                    <div className='container-fluid p-0 m-0'>
                      <div>
                        <div className="float-right">
                          <Button type="primary" onClick={this.openAssureursModal}>
                              <PlusOutlined style={{color:"white"}}/> Ajouter
                          </Button><br/><br/><br/>
                        </div>
                          
                      {AssureursLoad?(
                          <table className='table table-striped'>
                            <thead>
                              <tr>
                                <th>NOM</th>
                                <th>DESCRIPTION</th>
                                <th>ADRESSE</th>
                                <th>ACTION</th>
                              </tr>
                            </thead>
                            <tbody>
                                {this.state.listAssureurs.map((assures, index)=>
                                  <tr key={index}>
                                    <td>{assures.name}</td>
                                    <td>{assures.description}</td>
                                    <td>{assures.address}</td>
                                    <td>
                                        {/* <i class='far fa-edit' onClick={()=>this.selectForUpdateAssureur(assures)}></i> */}
                                        <i class='far fa-edit' style={{cursor:"pointer"}} onClick={() =>this.selectForUpdateAssureur(assures)}></i>

                                    </td>
                                  </tr>
                                  )}
                            </tbody>
                            </table>
                              ):(
                                <Spin/>
                              )}

                       {/* {AssureursLoad?(<Table dataSource={dataSourceAssureurs} columns={columnsAssureurs} scroll={{ x:1300}}/>):(<Spin/>)} */}
                      </div>
                    </div>
                </TabPane>
                <TabPane tab="Marque" key="4">
                  <div>
                    <div className="float-right">
                        <Button type="primary" onClick={this.showModal1}>
                          <PlusOutlined style={{color:"white"}}/> Ajouter
                        </Button><br></br><br></br>
                    </div>
                    {isLoad?(
                    <table className='table table-striped' width='100%'>
                      <thead>
                          <tr>
                            <th>MARQUE</th>
                            <th>DESCRIPTION</th>
                            <th>ACTION</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.state.listMarque.map((marque, index)=>
                                  <tr key={index}>
                                    <td>{marque.name}</td>
                                    <td>{marque.description}</td>
                                    <td>
                                        <i class='far fa-edit' style={{cursor:"pointer"}} onClick={()=>this.selectForUpdateMarque(marque)}></i>
                                    </td>
                                  </tr>
                                  )}
                      </tbody>
                    </table>
                    ):(
                      <Spin/>
                    )}
                   
                   {/* {isLoad?(<Table dataSource={dataSource} columns={columns}/>):(<Spin/>)} */}
              
                  </div>
                </TabPane>
                <br/>
            </Tabs>
              {/* ==================== MODAL AJOUT ==================== */}
                <Modal title="Ajout d'un nouvel Assuré !" centered visible={this.state.open}
                       onOk={this.hideAssuresModal}
                       onCancel={this.hideAssuresModal}
                       footer={[ ]}>
                           
                    <form onSubmit={this.addAssures}>
                      <div>
                          <div className="form-row">
                              <div className=" col-md-6">
                                  <label className="text-secondary mt-1" style={{float: "left", marginBottom: "-1px"}}><strong>NOM :</strong></label><br/>
                                  <Input type="text" placeholder="Nom de l'assuré" name="nomAssure" className="form-control form-control-sm flex-right"/>
                              </div><br/><br/><br/>
                              <div className=" col-md-6">
                                  <label className="text-secondary mt-1" style={{float: "left", marginBottom: "-1px"}}><strong>DESCRIPTION :</strong></label><br/>
                                  <Input type="text" placeholder="Description" name="descriptionAssure" className="form-control form-control-sm flex-right" style={{width: '100%'}}/>
                              </div><br/>
                          </div>
                      </div><br></br><br></br>
                        <div className="text-right w-100">
                            <Button onClick={this.hideAssuresModal}>
                                Annuler
                            </Button> &nbsp;
                            <Button type="primary" htmlType="submit" disabled={this.state.loading} loading={this.state.loading}>
                                Ajouter
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* ==================== MODAL AJOUT ASSUREUR ==================== */}
                <Modal title="Ajout d'un nouvel Assureur !" centered visible={this.state.visible}
                       onOk={this.hideAssureursModal}
                       onCancel={this.hideAssureursModal}
                       footer={[ ]}>
                           
                    <form onSubmit={this.addAssureurs}>
                      <div>
                          <div className="form-row">
                              
                                  <label className="text-secondary mt-1" style={{float: "left", marginBottom: "-1px"}}><strong>NOM :</strong></label><br/>
                                  <Input type="text" placeholder="Nom de l'assureur" name="nomAssureur" className="form-control form-control-sm flex-right" style={{width: '100%'}}/>
                              <br/><br/><br/><br/>
                                  <label className="text-secondary mt-1" style={{float: "left", marginBottom: "-1px"}}><strong>DESCRIPTION :</strong></label><br/>
                                  <Input type="text" placeholder="Description" name="descriptionAssureur" className="form-control form-control-sm flex-right" style={{width: '100%'}}/>
                              <br/><br/><br/><br/>
                                  <label className="text-secondary mt-1" style={{float: "left", marginBottom: "-1px"}}><strong>ADRESSE :</strong></label><br/>
                                  <Input type="text" placeholder="Adresse" name="address" className="form-control form-control-sm flex-right" style={{width: '100%'}}/>
                              <br/>
                          </div>
                      </div><br></br><br></br>
                        <div className="text-right w-100">
                            <Button onClick={this.hideAssureursModal}>
                                Annuler
                            </Button> &nbsp;
                            <Button type="primary" htmlType="submit" disabled={this.state.loading} loading={this.state.loading}>
                                Ajouter
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* ==================== MODAL FOR ADD USER==================== */}
                <Modal title="Nouvel enregistrement assuré !" centered visible={this.state.openModal}
                       onOk={()=> this.openModal(false)}
                       onCancel={()=> this.openModal(false)}
                       footer={[ ]}>
                    <form onSubmit={this.CreateNewAssurreur}>
                        <div className="container">
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> IDENTIFIANT : </strong></label>
                                    <input value={this.state.currentUser.username} name="username" type="text" placeholder="Entrez l'identifiant" className="form-control form-control-sm" required/>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong>NOM PRENOM(S) : </strong></label>
                                    <input value={this.state.currentUser.name} name="name" type="text" placeholder="Saisissez le nom" className="form-control form-control-sm" required/>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong>EMAIL : </strong></label>
                                    <input value={this.state.currentUser.email} name="email" type="email" placeholder="monemail@gmail.com" className="form-control form-control-sm"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label><strong>MOT DE PASSE : </strong></label>
                                    <input id="input_pword" name="anpassword" type="password" placeholder="Entrez le mot de passe" className="form-control form-control-sm" required/>
                                </div>
                                <div className="col form-group">
                                    <label><strong>CONFIRMER MOT DE PASSE : </strong></label>
                                    <input id="input_confirme_pword" name="password" type="password" placeholder="Confirmez le mot de passe" className="form-control form-control-sm" required/>
                                </div>
                            </div>
                        </div>
                        <div className="text-right w-100">
                            <Button onClick={()=> this.openModal(false)}>
                                Annuler
                            </Button> &nbsp;
                            <Button type="primary" htmlType="submit" disabled={this.state.loading} loading={this.state.loading}>
                                Ajouter
                            </Button>
                        </div>
                    </form>
                </Modal>
                  
                {/* ======================= ADD MARQUE ========================== */}             
                <Modal title="Ajout de Marque !" centered
                      //  visible={this.state.open}
                       onOk={this.hideModal1}
                       onCancel={this.hideModal1}
                       footer={[]}
                       visible={this.state.visibles}
                       >
                           
                    <form onSubmit={this.addMarque}>
                      <div>
                          <div className="form-row">
                              <div className=" col-md-6">
                                  <label className="text-secondary mt-1" style={{float: "left", marginBottom: "-1px"}}><strong>MARQUE :</strong></label><br/>
                                  <Input type="text" placeholder="Saisissez la marque" name="marque" className="form-control form-control-sm flex-right"/>
                              </div><br/>
                              <div className=" col-md-6">
                                  <label className="text-secondary mt-1" style={{float: "left", marginBottom: "-1px"}}><strong>DESCRIPTION :</strong></label><br/>
                                  <Input type="text" placeholder="Description" name="descriptionMarque" className="form-control form-control-sm flex-right" style={{width: '100%'}}/>
                              </div><br/>
                          </div>
                      </div><br></br><br></br>
                        <div className="text-right w-100">
                            <Button onClick={this.hideModal1}>
                                Annuler
                            </Button> &nbsp;
                            <Button type="primary" htmlType="submit" disabled={this.state.loading} loading={this.state.loading}>
                                Ajouter
                            </Button>
                        </div>
                    </form>
                </Modal>
                {/* ==================MODAL UPDATE==================== */}

                {/* ============ UPDATE USER=================== */}

                <Modal title="Mise à jour de l'utilisateur" centered visible={this.state.openModalForUpd}
                       onOk={()=> this.openModalForUpd(false)}
                       onCancel={()=> this.openModalForUpd(false)}
                       footer={[ ]}>
                    <form onSubmit={this.updateData}>
                        <div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> ID : </strong></label>
                                    <input id="iduser" disabled="true" name="name" type="text" value={this.state.currentUser.id} onChange={this.handleChange} className="form-control form-control-sm" required/>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> IDENTIFIANT : </strong></label>
                                    <input id="username" 

                                    disabled="true"
                                    name="username" 
                                    type="text" 
                                    value={this.state.currentUser.username} 
                                    onChange={this.handleChange} 
                                    className="form-control form-control-sm" required/>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> NOM PRENOM : </strong></label>
                                    <input id="name" name="name" type="text" value={this.state.currentUser.name} onChange={this.handleChange} className="form-control form-control-sm" required/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label><strong> EMAIL : </strong></label>
                                    <input id="email" disabled="true" name="email" value={this.state.currentUser.email} onChange={this.handleChange} type="email" className="form-control form-control-sm" required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label><strong>NOUVEAU MOT DE PASSE : </strong></label>
                                    <Input.Password id="input_pword"
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        name="password"
                                        onChange={this.handleChange} 
                                        className="form-control form-control-sm" />
                                </div>
                                <div className="col form-group">
                                    <label><strong> CONFIRMER MOT DE PASSE : </strong></label>
                                    <Input.Password 
                                        id="input_confirme_pword" 
                                        name="pword2" 
                                         
                                        onChange={this.handleChange} 
                                        className="form-control form-control-sm"
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="text-right w-100">
                            <Button onClick={()=> this.openModalForUpd(false)}>
                                Annuler
                            </Button> &nbsp;
                            <Button type="primary" htmlType="submit" disabled={this.state.loading} loading={this.state.loading}>
                                Modifier
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* =============== UPD AssUSSURE =====================*/}

                <Modal title="Mise à jour de l'assuré!" centered visible={this.state.openModalForUpdAssure}
                       onOk={()=> this.openModalForUpdAssure(false)}
                       onCancel={()=> this.openModalForUpdAssure(false)}
                       footer={[ ]}>
                    <form onSubmit={this.updateDataAssure}>
                        <div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> ID : </strong></label>
                                    <input id="iduser" name="name" type="text" disabled value={this.state.currentAssur.id} onChange={this.handleChangeAssure} className="form-control form-control-sm" required/>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> NOM : </strong></label>
                                    <input id="name" name="name" value={this.state.currentAssur.name} onChange={this.handleChangeAssure} type="text" className="form-control form-control-sm" required />
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> DESCRIPTION : </strong></label>
                                    <input id="description" name="description" type="text" value={this.state.currentAssur.description} onChange={this.handleChangeAssure} className="form-control form-control-sm" required />
                                </div>
                            </div>
                        </div>
                        <div className="text-right w-100">
                            <Button onClick={()=> this.openModalForUpdAssure(false)}>
                                Annuler
                            </Button> &nbsp;
                            <Button type="primary" htmlType="submit" disabled={this.state.loading} loading={this.state.loading}>
                                Modifier
                            </Button>
                        </div>
                    </form>
                </Modal>
                
                {/* =================== UPD ASSUREUR ================================ */}

                <Modal title="Mise à jour de l'assureur!" centered visible={this.state.openModalForUpdAssureurs}
                       onOk={()=> this.openModalForUpdAssureurs(false)}
                       onCancel={()=> this.openModalForUpdAssureurs(false)}
                       footer={[ ]}>
                    <form onSubmit={this.updateDataAssureurs}>
                        <div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> ID : </strong></label>
                                    <input id="idassure" disabled name="idassure" type="text" value={this.state.currentAssureur.id} onChange={this.handleChangeAssureur} className="form-control form-control-sm" required/>
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> NOM : </strong></label>
                                    <input id="name" name="name" value={this.state.currentAssureur.name} onChange={this.handleChangeAssureur} type="text" className="form-control form-control-sm" required />
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> DESCRIPTION : </strong></label>
                                    <input id="description" name="description" type="text" value={this.state.currentAssureur.description} onChange={this.handleChangeAssureur} className="form-control form-control-sm" required />
                                </div>
                            </div>
                            <div className="form-row" >
                                <div className="col form-group">
                                    <label><strong> ADRESSE : </strong></label>
                                    <input id="address" name="address" value={this.state.currentAssureur.address} onChange={this.handleChangeAssureur} type="text" className="form-control form-control-sm" required />
                                </div>
                            </div>
                        </div>
                        <div className="text-right w-100">
                            <Button onClick={()=> this.openModalForUpdAssureurs(false)}>
                                Annuler
                            </Button> &nbsp;
                            <Button type="primary" htmlType="submit" disabled={this.state.loading} loading={this.state.loading}>
                                Modifier
                            </Button>
                        </div>
                    </form>
                </Modal>
        
                {/* ======================== UPD MARQUES ================ */}
                
                <Modal title="Mise à jour de la marque!" centered visible={this.state.openModalForUpdMarque}
                       onOk={()=> this.openModalForUpdMarque(false)}
                       onCancel={()=> this.openModalForUpdMarque(false)}
                       footer={[ ]}>
                    <form onSubmit={this.updateDataMarque}>
                        <div>
                            <div className="form-row">
                                <div className="col form-group">
                                  {/* <input disabled="true" id="idmarque" value={this.state.currentMarque.id}></input> */}
                                    <label><strong> ID : </strong></label>
                                    <input id="iduser" disabled type="text" name="name" value={this.state.currentMarque.id} onChange={this.handleChangeMarque} className="form-control form-control-sm" required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                  {/* <input disabled="true" id="idmarque" value={this.state.currentMarque.id}></input> */}
                                    <label><strong> MARQUE : </strong></label>
                                    <input id="name" name="name" value={this.state.currentMarque.name} onChange={this.handleChangeMarque} type="text" className="form-control form-control-sm" required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label><strong> DESCRIPTION : </strong></label>
                                    <input id="description"  name="description" value={this.state.currentMarque.description} onChange={this.handleChangeMarque} type="text" className="form-control form-control-sm" required />
                                </div>
                            </div>
                        </div>
                        <div className="text-right w-100">
                            <Button onClick={()=> this.openModalForUpdMarque(false)}>
                                Annuler
                            </Button> &nbsp;
                            <Button type="primary" htmlType="submit" disabled={this.state.loading} loading={this.state.loading}>
                                Modifier
                            </Button>
                        </div>
                    </form>
                </Modal>
        </div>
        );
        }
    }

export default Parametre;
