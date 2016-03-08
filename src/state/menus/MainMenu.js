import Simplicity from '../../Simplicity';
import State from '../State';

class MainMenu extends State {

  create() {
    const menuContainer = Simplicity.UIManager.add('menuContainer', '');
    const playBtn = Simplicity.UIManager.add('playBtn', 'Play', menuContainer);
    Simplicity.UIManager.add('title', 'Simplicity', menuContainer);

    playBtn.addEventListener('mouseup', function() {
      Simplicity.StateManager.load('test')
    })
  }

}

export default MainMenu;
