Ext.define('NotesApp.controller.Notes', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            // We're going to look up our views by xtype.
            notesListView: 'noteslistview',
            noteEditorView: 'noteeditorview'
        },
        control: {
            notesListView: {
                // The commands fired by the notes list.
                newNoteCommand: 'onNewNoteCommand',
                editNoteCommand: 'onEditNoteCommand'
            },
            noteEditorView: {
                // The commands fired by the note editor.
                saveNoteCommand: 'onSaveNoteCommand',
                deleteNoteCommand: 'onDeleteNoteCommand',
                backToHomeCommand: 'onBackToHomeCommand'
            }
        }
    },



    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Event Handlers

    onNewNoteCommand: function () {

        console.log('onNewNoteCommand');

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newNote = Ext.create('NotesApp.model.Note', {
            id: noteId,
            dateCreated: now,
            title: '',
            narrative: ''
        });

        this.activateNoteEditor(newNote);
    },

    onEditNoteCommand: function (list, record) {

        console.log('onEditNoteCommand');

        this.activateNoteEditor(record);
    },

    onSaveNoteCommand: function () {

        console.log('onSaveNoteCommand');

        var noteEditorView = this.getNoteEditorView();
        var currentNote = noteEditorView.getRecord();
        var newValues = noteEditorView.getValues();

        // Update the current note's fields with form values.
        currentNote.set('title', newValues.title);
        currentNote.set('narrative', newValues.narrative);

        var errors = currentNote.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField('title')[0].getMessage(), Ext.emptyFn);
            currentNote.reject();
            return;
        }

        var notesStore = Ext.getStore('Notes');

        if (null == notesStore.findRecord('id', currentNote.data.id)) {
            notesStore.add(currentNote);
        }

        notesStore.sync();

        notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

        this.activateNotesList();
    },

    onDeleteNoteCommand: function () {

        console.log('onDeleteNoteCommand');

        var noteEditorView = this.getNoteEditorView();
        var currentNote = noteEditorView.getRecord();
        var notesStore = Ext.getStore('Notes');

        notesStore.remove(currentNote);
        notesStore.sync();

        this.activateNotesList();
    },

    onBackToHomeCommand: function () {

        console.log('onBackToHomeCommand');
        this.activateNotesList();
    },

    activateNoteEditor: function (record) {
        var noteEditorView = this.getNoteEditorView();
        noteEditorView.setRecord(record);
        Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
    },

    activateNotesList: function () {
        var notesListView = this.getNotesListView();
        Ext.Viewport.animateActiveItem(notesListView, this.slideRightTransition);
    },

    // Base class methods.

    //called when the Application is launched, remove if not needed
    launch: function () {
        this.callParent(arguments);
        var notesStore = Ext.getStore('Notes');
        notesStore.load();
        console.log('launch');
    },

    init: function () {
        this.callParent(arguments);
        console.log('init');
    }
});
