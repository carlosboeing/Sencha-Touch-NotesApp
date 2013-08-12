/**
 * Created by carlosboeing on 13/08/13.
 */
Ext.define('NotesApp.store.Notes', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    config: {
        model: 'NotesApp.model.Note',
        proxy: {
            type: 'localstorage',
            id: 'notes-app-store'
        },
//        data: [
//            { title: 'Note 1', narrative: 'narrative 1' },
//            { title: 'Note 2', narrative: 'narrative 2' }
//        ],
        autoLoad: true,
        sorters: [{ property: 'dateCreated', direction: 'DESC'}],
        grouper: {
            sortProperty: 'dateCreated',
            direction: 'DESC',
            groupFn: function (record) {
                if (record && record.data.dateCreated) {
                    return record.data.dateCreated.toDateString();
                } else {
                    return '';
                }
            }
        }
    }
});