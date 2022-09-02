import Vue from "vue";

export default interface IValidable extends Vue {
    reset(): void;
    resetValidation(): void;
    validate(): boolean;
}
