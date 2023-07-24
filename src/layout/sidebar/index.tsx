<<<<<<< HEAD
import './styles.css';

const Sidebar = (opened: any) => {
  return (
    <>
      <div className={`${opened ? 'opened' : 'closed'}`}> </div>
    </>
  );
};

export default Sidebar;
=======
// import { useState } from 'react';
// import './styles.css';
// import insert_chart from '../../assets/insert_chart.svg';
// import settings from '../../assets/settings.svg';
// import person from '../../assets/person.svg';
// import Sufix from '../../assets/sufix.svg';

// const Sidebar = (open: any) => {
//   // const [opened, setOpened] = useState(open);

//   // const handleClosingSidebar = () => {
//   //   setOpened(!opened);
//   // };

//   return (
//     <div
//     // className={`${opened ? 'opened' : 'closed'} sidebar`}
//     // onClick={handleClosingSidebar}
//     >
//       <div className="sidebarTitles">
//         <span className="menuSidebartext">Farma </span>
//         <span className="sidebarView">View </span>
//       </div>
//       <img className="sufix" src={Sufix}></img>
//       {/* <span className="">View </span> */}
//       <div className="sidebarRoutes">
//         <div className="sidebarPage">
//           <img src={insert_chart}></img>
//           <span>Visão geral</span>
//         </div>
//         <div className="sidebarPage">
//           <img src={settings}></img>
//           <span>Configurações</span>
//         </div>
//         <div className="sidebarPage">
//           <img src={person}></img>
//           <span>Meu perfil</span>
//         </div>
//       </div>
//       <div className="sidebarButtonDiv">
//         <button className="sidebarButton">
//           <span className="sidebarButtonText">Sair da conta</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
>>>>>>> d8b4583d9df4a3004135a427082d2ab705b35411
