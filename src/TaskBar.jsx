import x from './assets/x4.png'
import mini from './assets/mini4.png';
function Taskbar() {
    const handleMinimize = () => {
        window.electronAPI.minimizeWindow();
    }
    const handleClose = () => {
        window.electronAPI.closeWindow();
    }
  return (
    <div className="flex justify-between items-center px-3 py-1 bg-purple-light text-purple select-none fixed top-0 left-0 right-0 z-50 border-b border-purple "
         style={{ WebkitAppRegion: "drag" }}>
      <div className="text-sm text-bold text-[20px] text-bolder">MY TO DO</div>
      <div className="flex gap-2" style={{ WebkitAppRegion: "no-drag" }}>
        <span onClick={handleMinimize}
        className='cursor-pointer'
        >
          <img
            src={mini}
            className='w-[16px] m-1 mt-4'
          />
        </span>
        <span onClick={handleClose} className="cursor-pointer" >
           <img
            src={x}
            className='w-[25px] h-[27px] m-1'
          /> 
          
        </span>
      </div>
    </div>
  );
}

export default Taskbar;