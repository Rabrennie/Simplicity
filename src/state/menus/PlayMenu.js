import Simplicity from '../../Simplicity';
import State from '../State';
import Levels from '../levels/Levels';

class PlayMenu extends State {

  create() {
    const menuContainer = Simplicity.UIManager.add('menuContainer', '');
    Simplicity.UIManager.add('title', 'Levels', menuContainer);
    const list = Simplicity.UIManager.add('list', '', menuContainer);
    const backBtn  = Simplicity.UIManager.add('backBtn', 'Back', menuContainer);

    backBtn.addEventListener('mouseup',() => {
      Simplicity.StateManager.load('MainMenu')
    });

    for (var level in Levels) {
      if (Levels.hasOwnProperty(level)) {
        const levelElem = Simplicity.UIManager.add(level, '', list);
        Simplicity.UIManager.add('name', level, levelElem)
        const playBtn  = Simplicity.UIManager.add('play', '', levelElem);

        levelElem.className += ' item'

        playBtn.addEventListener('mouseup',() => {
          console.log(level)
          this.play(level, Levels[level]);
        });
      }
    }

  }

  play(levelName, level) {
    console.log(levelName, level)
    Simplicity.StateManager.add(levelName, level);
    Simplicity.StateManager.load(levelName);
  }

}

export default PlayMenu;
