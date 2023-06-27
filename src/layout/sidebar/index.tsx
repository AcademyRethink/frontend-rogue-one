import './styles.css';

const Sidebar = (opened: any) => {
  return (
    <>
      <div className={`${opened ? 'opened' : 'closed'}`}> </div>
    </>
  );
};

export default Sidebar;
