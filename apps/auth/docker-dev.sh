echo "Running setup commands..."

npm install --location=global prisma
npx prisma migrate dev
npx prisma db seed                   
npm run dev
