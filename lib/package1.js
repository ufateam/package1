'use babel';

import Package1View from './package1-view';
import { CompositeDisposable } from 'atom';

export default {

  package1View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.package1View = new Package1View(state.package1ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.package1View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'package1:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.package1View.destroy();
  },

  serialize() {
    return {
      package1ViewState: this.package1View.serialize()
    };
  },

  toggle() {
    console.log('Package1 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
