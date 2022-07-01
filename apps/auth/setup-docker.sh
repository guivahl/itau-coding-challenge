RUN npm install --location=global prisma
RUN npm install -D prisma@4.0.0
RUN npx prisma migrate dev
RUN npx prisma db seed                   
