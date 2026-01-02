import {
    NextResponse
} from 'next/server'

export async function POST(request) {
    try {
        const data = await request.json()

        // Validate required fields
        const {
            name,
            email,
            phone,
            city,
            message
        } = data
        if (!name || !email || !phone || !city || !message) {
            return NextResponse.json({
                error: 'All fields are required'
            }, {
                status: 400
            })
        }

        // In a real application, you would:
        // 1. Save to database
        // 2. Send email notification
        // 3. Send auto-reply to customer

        console.log('New enquiry received:', {
            name,
            email,
            phone,
            city,
            message,
            timestamp: new Date().toISOString()
        })

        // Simulate email sending (replace with actual email service)
        // You can integrate with services like:
        // - Nodemailer
        // - SendGrid
        // - AWS SES
        // - Resend

        return NextResponse.json({
            success: true,
            message: 'Enquiry submitted successfully'
        }, {
            status: 200
        })

    } catch (error) {
        console.error('Enquiry submission error:', error)
        return NextResponse.json({
            error: 'Internal server error'
        }, {
            status: 500
        })
    }
}