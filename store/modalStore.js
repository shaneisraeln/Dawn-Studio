import {
    create
} from 'zustand'

export const useModalStore = create((set) => ({
    isEnquiryOpen: false,
    openEnquiry: () => set({
        isEnquiryOpen: true
    }),
    closeEnquiry: () => set({
        isEnquiryOpen: false
    }),

    isReviewOpen: false,
    openReview: () => set({
        isReviewOpen: true
    }),
    closeReview: () => set({
        isReviewOpen: false
    }),
}))