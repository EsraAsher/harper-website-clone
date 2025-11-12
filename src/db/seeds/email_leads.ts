import { db } from '@/db';
import { emailLeads } from '@/db/schema';

async function main() {
    const sampleEmailLeads = [
        {
            email: 'sarah.johnson@gmail.com',
            name: 'Sarah Johnson',
            leadMagnet: 'apartment-pet-care-guide',
            subscribed: true,
            createdAt: new Date('2024-11-15').toISOString(),
        },
        {
            email: 'mike.peterson@yahoo.com',
            name: 'Mike Peterson',
            leadMagnet: 'first-time-dog-owner-checklist',
            subscribed: true,
            createdAt: new Date('2024-11-22').toISOString(),
        },
        {
            email: 'emma.chen@outlook.com',
            name: 'Emma Chen',
            leadMagnet: 'cat-enrichment-ebook',
            subscribed: false,
            createdAt: new Date('2024-12-01').toISOString(),
        },
        {
            email: 'james.martinez@gmail.com',
            name: 'James Martinez',
            leadMagnet: 'pet-odor-elimination-tips',
            subscribed: true,
            createdAt: new Date('2024-12-05').toISOString(),
        },
        {
            email: 'lisa.thompson@yahoo.com',
            name: 'Lisa Thompson',
            leadMagnet: 'small-space-training-guide',
            subscribed: true,
            createdAt: new Date('2024-12-10').toISOString(),
        },
        {
            email: 'david.kim@outlook.com',
            name: 'David Kim',
            leadMagnet: 'apartment-pet-care-guide',
            subscribed: true,
            createdAt: new Date('2024-12-18').toISOString(),
        },
        {
            email: 'rachel.williams@gmail.com',
            name: 'Rachel Williams',
            leadMagnet: 'first-time-dog-owner-checklist',
            subscribed: false,
            createdAt: new Date('2024-12-22').toISOString(),
        },
        {
            email: 'alex.rodriguez@yahoo.com',
            name: 'Alex Rodriguez',
            leadMagnet: 'cat-enrichment-ebook',
            subscribed: true,
            createdAt: new Date('2025-01-03').toISOString(),
        },
    ];

    await db.insert(emailLeads).values(sampleEmailLeads);
    
    console.log('✅ Email leads seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});