<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>操作日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" @keyup.enter.native="query()">
                    <el-form-item>
                        <el-input v-model="search" placeholder="用户名" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="query()" type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <el-table :data="tableData" border class="table"  highlight-current-row v-loading="loading">
                <el-table-column
                    prop="id"
                    header-align="center"
                    align="center"
                    width="80"
                    label="ID">
                </el-table-column>
                <el-table-column
                    prop="username"
                    header-align="center"
                    align="center"
                    width="100"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    header-align="center"
                    align="center"
                    width="160"
                    label="用户操作">
                </el-table-column>
                <el-table-column
                    prop="method"
                    header-align="center"
                    align="center"
                    width="300"
                    :show-overflow-tooltip="true"
                    label="请求方法">
                </el-table-column>
                <el-table-column
                    prop="params"
                    header-align="center"
                    align="center"
                    width="500"
                    :show-overflow-tooltip="true"
                    label="请求参数">
                </el-table-column>
                <el-table-column
                    prop="time"
                    header-align="center"
                    width="80"
                    align="center"
                    label="执行时长(毫秒)">
                </el-table-column>
                <el-table-column
                    prop="ip"
                    header-align="center"
                    align="center"
                    width="150"
                    label="IP地址">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    header-align="center"
                    align="center"
                    width="150"
                    label="创建时间">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <pagination @search="query" :total="pageData.total" :currentPage="pageData.pageNum"/>
            </div>
        </div>

    </div>
</template>
<script>
    import logApi from '../../api/log';
    import pagination from '../../components/common/pagination.vue';

    export default {
        name: 'logTable',
        data() {
            return {
                search: null,
                loading: false,
                pageData: {
                    pageNum: 1,
                    pageSize: 30,
                    total: 0
                },
                tableData: [],   //画稿列表
            }
        },
        components: {
            "pagination": pagination
        },
        created() {
            this.query();
        },

        methods: {
            //页面初始化查询
            query(pageNum, pageSize) {

                var param = {};
                param.current = pageNum || 1;
                param.size = pageSize || this.pageData.pageSize;
                param.username = this.search;
                this.loading = true;
                logApi.selectLogPageList(param).then(data => {
                    this.loading = false;
                    if (data && data.code == 0) {
                        this.tableData = data.page.list;
                        this.pageData.total = data.page.totalCount;
                    } else {
                        this.tableData = []
                        this.pageData.total = 0
                    }
                    this.pageData.pageNum = param.current;
                    this.pageData.pageSize = param.size;

                });
            },
        }
    }

</script>
