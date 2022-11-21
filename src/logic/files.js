import instance from '../helper/knex.js';

/*{
  fieldname: 'file',
  originalname: '.gitignore',
  encoding: '7bit',
  mimetype: 'application/octet-stream',
  destination: 'uploads',
  filename: '0d03283b84ed688106fa047c27e91aa9',
  path: 'uploads\\0d03283b84ed688106fa047c27e91aa9',
  size: 13
}*/
const Service = {
  uploadFile: async (file) => {
    await instance('files').insert({ 'title': file.originalname, 'expansion': file.encoding, 'MIME_TYPE': file.mimetype, 'size': file.size });
    return { 'msg': 'file is upload' };
  },
  deletedFile: async (id) => {
    const file = await instance('files').select('id').where('id', id);
    if (file.length === 0) {
      throw new Error('msg file is upload');
    }

    await instance('files').delete().where('id', id);
    return { 'msg': 'file is deleted' };
  },
  fileInfo: async (id) => {
    const file = await instance('files').select('id').where('id', id);
    if (file.length === 0) {
      throw new Error('msg file is upload');
    }
    return await instance('files').select('*').where('id', id);
  },
  updateFile: async (id, file) => {
    await instance('files').where('id',id).update({ 'title': file.originalname, 'expansion': file.encoding, 'MIME_TYPE': file.mimetype, 'size': file.size });
    return { 'msg': 'file is updated' };
  },
    
};

export default Service;