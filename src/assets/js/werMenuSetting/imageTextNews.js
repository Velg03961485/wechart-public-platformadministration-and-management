import {quillEditor} from 'vue-quill-editor'
import WXApi from '@/api/wxPost'
import JavaApi from '../../../config/javaAPI'
// import OrderApi from '@/api/order'
export default {
  name: "iamge-text-news",
  data(){
    return{
      originalId: '',
      pageNum:1,
      pageSize:10,
      content:"",
      FormVisible:false,
      dialogTitle:'',
      imageUrl: '',
      imageUrlLink:'',
      tableData: [],
      pages:'',
      upLoadData: {
        access_token: localStorage.getItem('knock_knock'),
      },
      postUrlIamge:'',
      rules:{
        id:[
          {required: true, message: '请输入公众号ID', trigger: 'blur'},
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      activeName:'first',
      formOfText:{
        name:'',
        content:'',
        keyword:''
      },
      formOfLink:{
        name:'',
        link:'',
        keyword:'',
      },
      useType:'first',   //默认为first
      editorOption:{},
      pageCount:'',
      perPage:'',
      addOrChangeOld:'add',   //新增还是修改
      postChangeId:0,
    }
  },
  components:{
    quillEditor
  },
  computed:{
    editor(){
      console.log('ppp')
      return this.$refs.myTextEditor.quill
    }
  },
  mounted(){

  },
  created:function(){
    console.log(sessionStorage.getItem('onlyWXId'))
    this.$data.originalId = sessionStorage.getItem('onlyWXId');
    this.getAll();
  },
  methods: {
    handleEdit(index, row) {
      //先做清空数据
      this.$data.formOfText.name = '';
      this.$data.formOfText.keyword = '';
      this.$data.formOfText.content = '';
      this.$data.formOfLink.name = '';
      this.$data.formOfLink.keyword = '';
      this.$data.formOfLink.link = '';
      this.$data.activeName = 'first';
      this.imageUrl = '';
      this.imageUrlLink = '';
      console.log(row);
      this.$data.dialogTitle = '编辑图文消息';
      this.$data.FormVisible = true;
      this.$data.addOrChangeOld = 'change';
      this.$data.postChangeId = row.id;
      // this.$data.formName.name = row.name;
      // this.$data.formName.keyword = row.keyword;
      let list = {
        id:row.id
      };
      let qs = require('querystring')
      WXApi.checkOutThisOnes(qs.stringify(list)).then((response) => {
        console.log(response.data.data.type);
        if(response.data.data.type === '0'){
          this.$data.activeName = 'first';
          console.log(response.data.data.title);
          this.$data.formOfText.name = response.data.data.title;
          console.log(this.$data.formOfText.name)
          this.$data.formOfText.keyword = response.data.data.keyword;
          this.$data.formOfText.content = response.data.data.content;
          this.imageUrl = response.data.data.url;
        }else if(response.data.data.type === '1'){
          this.$data.activeName = 'second';
          this.$data.formOfLink.name = response.data.data.title;
          console.log(this.$data.formOfText.name)
          this.$data.formOfLink.keyword = response.data.data.keyword;
          this.$data.formOfLink.link = response.data.data.content;
          this.imageUrlLink = response.data.data.url;
        }

      })
    },
    getAll() {
      let list = {
        originalId:this.$data.originalId,
        pageNum:this.$data.pageNum,
        pageSize:this.$data.pageSize,
      };
      let qs = require('querystring');
      WXApi.getAllTextWordList(qs.stringify(list)).then((res) => {
        console.log(res.data.data.list);
        this.$data.tableData = res.data.data.list;
        this.$data.pageCount = res.data.data.pages;
        this.$data.perPage = res.data.data.size;
      })
    },
    //分页
    handleCurrentChange(val){
      this.$data.pageNum = val;
      this.getList();
    },
    //上传图片动态地址
    importFileUrl() {
      return global.LOADUP_IMAGES
      // return JavaApi.UPLOGINIAMGE
    },
    handleDelete(index, row) {
      console.log(row.id);
      let list = {
        id:row.id
      };
      let qs = require('querystring')
      WXApi.deletThisOneTextWord(qs.stringify(list)).then((response) => {
        console.log(response.data);
        if(response.data.code === 0){
          console.log('成功')
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getAll()
        }else if(response.data.code === 1){
          console.log('失败')
          this.$message.error('删除失败');
        }
      })


    },
    add(){
      this.$data.formOfText = {};
      this.$data.formOfLink = {};
      console.log('新增一条');
      this.$data.dialogTitle = '新建图文消息';
      this.$data.FormVisible = true;
      this.$data.addOrChangeOld = 'add';   //代表新增
      this.imageUrl = '';
      this.imageUrlLink = '';
    },
    handleAvatarSuccess(res, file) {
      console.log(res.data.fullpath);
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$data.postUrlIamge = res.data.fullpath;
    },
    handleAvatarSuccessForLink(res, file){
      console.log(res);
      console.log(file);
      this.imageUrlLink = URL.createObjectURL(file.raw);
      this.$data.postUrlIamge = res.data.fullpath;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleClick(val){
      console.log(val.name)
    //  使用了哪一种方式去新增
      this.$data.useType = val.name;
    },
    onEditorChange({ editor, html, text }) {//富文本编辑器  文本改变时 设置字段值
      // this.content = html;
    },
  //  取消新增或者修改
    cancel(){
      this.$data.FormVisible =! this.$data.FormVisible;
    //  回复默认
      this.$data.formOfText.name = '';
      this.$data.formOfText.keyword = '';
      this.$data.formOfText.content = '';
      this.$data.formOfLink.name = '';
      this.$data.formOfLink.keyword = '';
      this.$data.formOfLink.link = '';
      this.$data.activeName = 'first';

    },
    //提交
    submitForm(){
      console.log('提交')
    //  提交的时候，先判断，是哪种方式，再去判断是否填写完整
      let list;
      if(this.$data.useType === 'first') {
        console.log('使用了图文')
        list = {
          keyword:this.$data.formOfText.keyword,
          type:'0',
          title:this.$data.formOfText.name,
          content:this.$data.formOfText.content,
          url:this.$data.postUrlIamge,
          originalId:this.$data.originalId
        }
        // console.log(this.$data.formOfText.keyword);
        if(this.$data.formOfText.keyword === '' || this.$data.formOfText.keyword === undefined){
          this.$message.error('请添加关键字');
          return;
        }
        if(this.$data.formOfText.name === '' || this.$data.formOfText.name === undefined){
          this.$message.error('请添加标题');
          return;
        }
        if(this.$data.postUrlIamge === ''){
          this.$message.error('请添加背景图');
          return;
        }
        if(this.$data.formOfText.content === '' || this.$data.formOfText.content === undefined){
          this.$message.error('请填写内容');
          return;
        }
      }else if(this.$data.useType === 'second') {
        console.log('使用了外部链接')
        list = {
          keyword:this.$data.formOfLink.keyword,
          type:'1',
          title:this.$data.formOfLink.name,
          content:this.$data.formOfLink.link,
          url:this.$data.postUrlIamge,
          originalId:this.$data.originalId
        }
        if(this.$data.formOfLink.keyword === '' || this.$data.formOfLink.keyword === undefined){
          this.$message.error('请添加关键字');
          return;
        }
        if(this.$data.formOfLink.name === '' || this.$data.formOfLink.name === undefined){
          this.$message.error('请添加标题');
          return;
        }
        if(this.$data.postUrlIamge === ''){
          this.$message.error('请添加背景图');
          return;
        }
        if(this.$data.formOfLink.link === '' || this.$data.formOfLink.link === undefined){
          this.$message.error('请填写内容');
          return;
        }
      }
      console.log(list)
      if(this.$data.addOrChangeOld === 'add'){
      //  新增
        let qs = require('querystring')
        WXApi.addNewTextWord(qs.stringify(list)).then((response) => {
          console.log(response.data);
          if(response.data.code === 0){
            console.log('成功')
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.getAll()
            this.$data.FormVisible =! this.$data.FormVisible;
          }else if(response.data.code === 1){
            console.log('失败')
            this.$message.error('保存失败');
          }
        })
      }else if(this.$data.addOrChangeOld === 'change'){
      //  修改
        list.id = this.$data.postChangeId;
        let qs = require('querystring')
        WXApi.changeOldForTextWord(qs.stringify(list)).then((response) => {
          console.log(response.data);
          if(response.data.code === 0){
            console.log('成功')
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.getAll()
            this.$data.FormVisible =! this.$data.FormVisible;
          }else if(response.data.code === 1){
            console.log('失败')
            this.$message.error('保存失败');
          }
        })
      }

    }
  }
}
