<template>
	<div class="pagination">
        <el-pagination
        	background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,30,50,100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
  </div>
</template>

<script>
	let pageNum = 1;
    export default {
        props: {
            total: {
                type: Number,
                default: 0
            },
            currentPage: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                pageSize: 30
            };
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.$emit('search', 1, this.pageSize);
            },
            handleCurrentChange(val) {
                pageNum = val;
                this.$emit('search', pageNum, this.pageSize);
            }
        }
    };
</script>

<style>
</style>
