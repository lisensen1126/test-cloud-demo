<template>
    <div v-loading="loading">
        <pdf ref="pdf" v-for="i in numPages" :key="i" :src="loadingTask" :page="i" />
    </div>
</template>

<script>
// import pdf from "vue-pdf";
import pdf from 'vue-pdf/src/vuePdfNoSssNoWorker';
export default {
    name: 'TestCasePdf',
    components: { pdf },
    props: {
        fileId: String,
    },
    data() {
        return {
            loading: false,
            numPages: null,
            loadingTask: null,
        };
    },
    mounted() {
        this.loading = true;
        this.loadingTask = pdf.createLoadingTask('/api/metersphere/test/case/file/preview/' + this.fileId);
        this.loadingTask.promise
            .then(pdf => {
                this.numPages = pdf.numPages;
                this.loading = false;
            })
            .catch(() => {
                this.loading = false;
                this.$error(this.$t('test_track.case.pdf_loading_fail'));
            });
    },
};
</script>

<style scoped></style>
