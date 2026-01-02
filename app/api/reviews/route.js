import {
    NextResponse
} from 'next/server'

// In-memory storage for demo (use database in production)
let reviews = [{
        id: 1,
        name: 'Priya & Rahul',
        email: 'priya@example.com',
        service: 'wedding',
        rating: 5,
        review: 'Dawn HD Studio captured our wedding beautifully! Every moment was perfect and the team was so professional.',
        date: '2024-12-15T10:30:00Z',
        status: 'approved'
    },
    {
        id: 2,
        name: 'Ananya Sharma',
        email: 'ananya@example.com',
        service: 'prewedding',
        rating: 5,
        review: 'Amazing pre-wedding shoot! The photographers were creative and made us feel comfortable throughout.',
        date: '2024-12-10T14:20:00Z',
        status: 'approved'
    },
    {
        id: 3,
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        service: 'family',
        rating: 4,
        review: 'Great family photography session. The kids loved the photographers and the photos turned out wonderful.',
        date: '2024-12-05T16:45:00Z',
        status: 'approved'
    }
]

export async function GET(request) {
    try {
        const {
            searchParams
        } = new URL(request.url)
        const status = searchParams.get('status')

        let filteredReviews = reviews

        if (status) {
            filteredReviews = reviews.filter(review => review.status === status)
        }

        // Sort by date (newest first)
        filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date))

        return NextResponse.json({
            success: true,
            reviews: filteredReviews
        })
    } catch (error) {
        console.error('Error fetching reviews:', error)
        return NextResponse.json({
            error: 'Failed to fetch reviews'
        }, {
            status: 500
        })
    }
}

export async function POST(request) {
    try {
        const data = await request.json()

        // Validate required fields
        const {
            name,
            email,
            service,
            rating,
            review
        } = data
        if (!name || !email || !service || !rating || !review) {
            return NextResponse.json({
                error: 'All fields are required'
            }, {
                status: 400
            })
        }

        // Create new review
        const newReview = {
            id: reviews.length + 1,
            name,
            email,
            service,
            rating: parseInt(rating),
            review,
            date: new Date().toISOString(),
            status: 'pending' // Reviews need approval
        }

        reviews.push(newReview)

        console.log('New review submitted:', newReview)

        return NextResponse.json({
            success: true,
            message: 'Review submitted successfully',
            review: newReview
        }, {
            status: 201
        })

    } catch (error) {
        console.error('Review submission error:', error)
        return NextResponse.json({
            error: 'Internal server error'
        }, {
            status: 500
        })
    }
}

export async function PATCH(request) {
    try {
        const data = await request.json()
        const {
            id,
            status
        } = data

        if (!id || !status) {
            return NextResponse.json({
                error: 'ID and status are required'
            }, {
                status: 400
            })
        }

        const reviewIndex = reviews.findIndex(review => review.id === parseInt(id))

        if (reviewIndex === -1) {
            return NextResponse.json({
                error: 'Review not found'
            }, {
                status: 404
            })
        }

        reviews[reviewIndex].status = status

        return NextResponse.json({
            success: true,
            message: 'Review status updated',
            review: reviews[reviewIndex]
        })

    } catch (error) {
        console.error('Review update error:', error)
        return NextResponse.json({
            error: 'Internal server error'
        }, {
            status: 500
        })
    }
}

export async function DELETE(request) {
    try {
        const {
            searchParams
        } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({
                error: 'Review ID is required'
            }, {
                status: 400
            })
        }

        const reviewIndex = reviews.findIndex(review => review.id === parseInt(id))

        if (reviewIndex === -1) {
            return NextResponse.json({
                error: 'Review not found'
            }, {
                status: 404
            })
        }

        reviews.splice(reviewIndex, 1)

        return NextResponse.json({
            success: true,
            message: 'Review deleted successfully'
        })

    } catch (error) {
        console.error('Review deletion error:', error)
        return NextResponse.json({
            error: 'Internal server error'
        }, {
            status: 500
        })
    }
}