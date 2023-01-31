<template>
  <div class="user">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="dataClear"
    >
      <!-- 用户表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="user-header">
      <el-button @click="addUser" type="primary">+新增</el-button>
      <!-- from搜索区 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-table">
      <el-table :data="tableData" style="width: 100%" height="90%" stripe>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sexlabel" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="rowEdit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="rowRemove(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="selectPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { addUser, getUser, editUser, delUser } from "../api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modalType: 0, //0表示新增弹窗，1表示编辑弹窗
      total: 0, //数据的数量用于分页
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm:{
        name:''
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType === 0) {
            //通过接口更新数据
            addUser(this.form).then(() => {
              //更新后获取数据列表
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          this.dialogVisible = false;
          this.$refs.form.resetFields();
        }
      });
    },
    dataClear() {
      //清空表单
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.dataClear();
      this.dialogVisible = false;
    },
    rowEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    rowRemove(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //更新后获取数据列表
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addUser() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    getList() {
      //获取数据列表
      getUser({ params: {...this.userForm,...this.pageData} }).then(({ data }) => {
        this.tableData = data.list;
        this.total = data.count || 0;
      });
    },
    selectPage(val) {
      this.pageData.page = val;
      this.getList();
    },
    onSubmit(){
      this.getList()
    }
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
.user {
  height: 90%;
}
.user-table {
  position: relative;
  height: 95%;
}
.user-table .pager {
  position: absolute;
  right: 20px;
  bottom: 0;
}
.user-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>