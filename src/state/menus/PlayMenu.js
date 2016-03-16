import Simplicity from '../../Simplicity';
import State from '../State';

class PlayMenu extends State {

  create() {
    const menuContainer = Simplicity.UIManager.add('menuContainer', '');
    Simplicity.UIManager.add('title', 'Recently Played', menuContainer);
    const list = Simplicity.UIManager.add('list', '', menuContainer);
    const backBtn  = Simplicity.UIManager.add('backBtn', 'Back', menuContainer);

    backBtn.addEventListener('mouseup',() => {
      Simplicity.StateManager.load('MainMenu')
    });

    const levels = JSON.parse(window.localStorage.levels)
    levels.forEach((level) => {
      const levelElem = Simplicity.UIManager.add(level, '', list);
      Simplicity.UIManager.add('name', JSON.parse(atob(level)).n, levelElem);
      const playBtn  = Simplicity.UIManager.add('play', '', levelElem);

      levelElem.className += ' item'

      playBtn.addEventListener('mouseup',() => {
        this.play(level);
      });
    });

  }

  play(level) {
    Simplicity.hash = level;
    Simplicity.StateManager.load('SharedLevel');
  }

}

export default PlayMenu;
