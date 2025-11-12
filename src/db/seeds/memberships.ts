import { db } from '@/db';
import { memberships } from '@/db/schema';

async function main() {
    const sampleMemberships = [
        {
            userId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            planType: 'free',
            status: 'active',
            startedAt: new Date('2024-06-15').toISOString(),
            expiresAt: null,
            stripeSubscriptionId: null,
        },
        {
            userId: 'user_02j5lyu3f9a0z4c2o8n7r6x9t5',
            planType: 'free',
            status: 'active',
            startedAt: new Date('2024-08-22').toISOString(),
            expiresAt: null,
            stripeSubscriptionId: null,
        },
        {
            userId: 'user_03k6mzv4g0b1a5d3p9o8s7y0u6',
            planType: 'basic',
            status: 'active',
            startedAt: new Date('2024-09-10').toISOString(),
            expiresAt: new Date('2025-09-10').toISOString(),
            stripeSubscriptionId: 'sub_1QR2ST3UV4WX5YZ6AB7CD8EF',
        },
        {
            userId: 'user_04l7naw5h1c2b6e4q0p9t8z1v7',
            planType: 'basic',
            status: 'cancelled',
            startedAt: new Date('2024-05-05').toISOString(),
            expiresAt: new Date('2025-02-15').toISOString(),
            stripeSubscriptionId: 'sub_2GH3IJ4KL5MN6OP7QR8ST9UV',
        },
        {
            userId: 'user_05m8obx6i2d3c7f5r1q0u9a2w8',
            planType: 'premium',
            status: 'active',
            startedAt: new Date('2024-07-18').toISOString(),
            expiresAt: new Date('2025-07-18').toISOString(),
            stripeSubscriptionId: 'sub_3WX4YZ5AB6CD7EF8GH9IJ0KL',
        },
        {
            userId: 'user_06n9pcy7j3e4d8g6s2r1v0b3x9',
            planType: 'premium',
            status: 'expired',
            startedAt: new Date('2023-10-20').toISOString(),
            expiresAt: new Date('2024-10-20').toISOString(),
            stripeSubscriptionId: 'sub_4MN5OP6QR7ST8UV9WX0YZ1AB',
        },
    ];

    await db.insert(memberships).values(sampleMemberships);
    
    console.log('✅ Memberships seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});