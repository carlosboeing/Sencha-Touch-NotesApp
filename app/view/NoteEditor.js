/**
 * Created by carlosboeing on 13/08/13.
 */
Ext.define('NotesApp.view.NoteEditor', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.Toolbar', 'Ext.form.FieldSet', 'Ext.form.Text', 'Ext.field.TextArea', 'Ext.MessageBox'],
    alias: 'widget.noteeditorview',
    config: {
        scrollable: 'vertical',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Edit Note',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: 'Home',
                        itemId: 'backButton',
                        align: 'left'
                    },
                    {
                        xtype: 'button',
                        ui: 'action',
                        text: 'Save',
                        itemId: 'saveButton',
                        align: 'right'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        iconCls: 'trash',
                        iconMask: true,
                        itemId: 'deleteButton'
                    }
                ]
            },
            { xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'title',
                        label: 'Title',
                        required: true
                    },
                    {
                        xtype: 'textareafield',
                        name: 'narrative',
                        label: 'Narrative'
                    }
                ]
            }
        ],
        listeners: [
            {
                delegate: '#saveButton',
                event: 'tap',
                fn: 'onSaveButtonTap'
            },
            {
                delegate: '#deleteButton',
                event: 'tap',
                fn: 'onDeleteButtonTap'
            },
            {
                delegate: '#backButton',
                event: 'tap',
                fn: 'onBackButtonTap'
            }
        ]
    },
    onSaveButtonTap: function () {
        console.log('saveNoteCommand');
        this.fireEvent('saveNoteCommand', this);
    },
    onDeleteButtonTap: function () {
        console.log('deleteNoteCommand');
        this.fireEvent('deleteNoteCommand', this);
    },
    onBackButtonTap: function () {
        console.log('backToHomeCommand');
        this.fireEvent('backToHomeCommand', this);
    }
});
