const assert = require('chai').should();
const expect = require('chai').expect;
const fs = require('fs');
const readFileAsync = require('util').promisify(fs.readFile);
const filePath = './airbnb_session_data.txt';
const {objectToSortedArray, createFileRowsStructure} = require('../helpers/users.session.helpers');
const UsersSessionsService = require('../services/users.sessions.service');

const structureFields = [ 'id_visitor',
    'id_session',
    'dim_session_number',
    'dim_user_agent',
    'dim_device_app_combo',
    'ds',
    'ts_min',
    'ts_max',
    'did_search',
    'sent_message',
    'sent_booking_request',
    'next_id_session',
    'next_dim_session_number',
    'next_dim_user_agent',
    'next_dim_device_app_combo',
    'next_ds',
    'next_ts_min',
    'next_ts_max',
    'next_did_search',
    'next_sent_message',
    'next_sent_booking_request' ];

const exampleFileData = [ 'id_visitor|id_session|dim_session_number|dim_user_agent|dim_device_app_combo|ds|ts_min|ts_max|did_search|sent_message|sent_booking_request|next_id_session|next_dim_session_number|next_dim_user_agent|next_dim_device_app_combo|next_ds|next_ts_min|next_ts_max|next_did_search|next_sent_message|next_sent_booking_request',
    'ed1329a6-064d-47e9-93bc-93f5a50822df|a8dfb8ed5aa79e00ff14b2da297c9778|83|Airbnb/6.0 iPhone/8.1.2|iPhone - iOS|2015-02-16|2015-02-16 21:50:41|2015-02-16 22:13:42|0|0|0|b812bf56bf89b0b31f4e5b50d0c15ff8|84|Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36|Desktop - Chrome|2015-02-18|2015-02-18 11:57:15|2015-02-18 12:12:48|0|0|0',
    'ed1329a6-064d-47e9-93bc-93f5a50822df|950277daef16f86dc2c05d2b212eea81|84|Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36|Desktop - Chrome|2015-02-18|2015-02-18 11:57:15|2015-02-18 12:12:48|0|0|0|456083b5f5506ad125d595006819de1d|85|Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36|Desktop - Chrome|2015-02-18|2015-02-18 13:02:13|2015-02-18 13:05:36|0|0|0' ];

const etaloncreateFileRowsStructureResult = [ { id_visitor: 'ed1329a6-064d-47e9-93bc-93f5a50822df',
    id_session: 'a8dfb8ed5aa79e00ff14b2da297c9778',
    dim_session_number: '83',
    dim_user_agent: 'Airbnb/6.0 iPhone/8.1.2',
    dim_device_app_combo: 'iPhone - iOS',
    ds: '2015-02-16',
    ts_min: '2015-02-16 21:50:41',
    ts_max: '2015-02-16 22:13:42',
    did_search: '0',
    sent_message: '0',
    sent_booking_request: '0',
    next_id_session: 'b812bf56bf89b0b31f4e5b50d0c15ff8',
    next_dim_session_number: '84',
    next_dim_user_agent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
    next_dim_device_app_combo: 'Desktop - Chrome',
    next_ds: '2015-02-18',
    next_ts_min: '2015-02-18 11:57:15',
    next_ts_max: '2015-02-18 12:12:48',
    next_did_search: '0',
    next_sent_message: '0',
    next_sent_booking_request: '0' },
    { id_visitor: 'ed1329a6-064d-47e9-93bc-93f5a50822df',
        id_session: '950277daef16f86dc2c05d2b212eea81',
        dim_session_number: '84',
        dim_user_agent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
        dim_device_app_combo: 'Desktop - Chrome',
        ds: '2015-02-18',
        ts_min: '2015-02-18 11:57:15',
        ts_max: '2015-02-18 12:12:48',
        did_search: '0',
        sent_message: '0',
        sent_booking_request: '0',
        next_id_session: '456083b5f5506ad125d595006819de1d',
        next_dim_session_number: '85',
        next_dim_user_agent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
        next_dim_device_app_combo: 'Desktop - Chrome',
        next_ds: '2015-02-18',
        next_ts_min: '2015-02-18 13:02:13',
        next_ts_max: '2015-02-18 13:05:36',
        next_did_search: '0',
        next_sent_message: '0',
        next_sent_booking_request: '0' } ];


describe('check if file for parsing exists', function() {
    it('file for parsing must exists', function () {
        assert.equal(fs.existsSync(filePath), true);
    });
});

describe('check if file for parsing valid', function() {

    let readedFile = [];

    before(async function() {
        const readedBuffer = await readFileAsync('./airbnb_session_data.txt');
        readedFile = readedBuffer.toString().split('\n');
    });

    it('should be not empty', function () {
        assert.equal(readedFile.length > 2, true);
    });

    it('first line of file must contain structure fields', function () {
        expect(readedFile[0].split('|')).to.deep.equal(structureFields);
    });

    it('each line in file must have valid length', function () {
        readedFile.forEach(function (row) {
            if(row.length && row.split('|').length !== 21){
                assert.equal(false, true);
            }
        });
    });
});

describe('check helpers', function () {
    it('check objectToSortedArray', function () {
        expect(objectToSortedArray({
            name: {value:3},
            name2: {value:2},
        }, 'value')).to.deep.equal([ { name: 'name', value: 3 }, { name: 'name2', value: 2 } ]);
    });

    it('check createFileRowsStructure', function () {
        expect(createFileRowsStructure(exampleFileData)).to.deep.equal(etaloncreateFileRowsStructureResult);
    });
});

describe('check result of parsing', function () {
    it('check parsing result', async function () {
        const parseResult = await UsersSessionsService.getUsersSessions();

        if(Object.keys(parseResult).length !== 3){
            assert.equal(false, true);
        }

        Object.values(parseResult).forEach(function (item) {
            if(!item.length){
                assert.equal(false, true);
            }
        });
    });
});

