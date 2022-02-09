#include<stdio.h>
#include<conio.h>

const int N = 5;

int main ()
{
    int m[N][N];
    int k;
    int s[k];

    printf ("\nDigite valor para os elementos da matriz");

    for (int i=0; i<N; i++ )
        for (int j=0; j<N; j++ )
        {
            printf ("\nElemento da matriz [%d][%d] = ", i, j);
            scanf ("%d", &m[ i ][ j ]);
        }

        printf ("\n\n A matriz digitada foi: \n\n");
    for (int i=0; i<N; i++ )
        for (int j=0; j<N; j++ )
        {
            if(j==N-1)
                printf("   %d\n\n", m[i][j]);
            else
                printf("   %d", m[i][j]);
        }

    printf ("\n\nDigite o valor para o tamanho da sequencia: ");
    scanf ("%d", &k);

    while(k>N || k<2)
    {
        printf ("\nDigite o valor para o tamanho da sequencia: ");
        scanf ("%d", &k);
    }

    for(int i=0; i<k; i++)
    {
        printf ("\nElemento da sequencia[%d] = ", i);
        scanf ("%d", &s[i]);
    }


    for (int y=0; y<=N-k; y++ )
        for (int x=0; x<N; x++ )
        {
            int contador = 0;

            if(m[x][y] == s[0])
                for(int q =0; q<k; q++)
                {
                    if(s[q]== m[x][y+q])
                        contador++;
                }

            if(contador==k)
                printf("(%d,%d) sentido: esquerda para direita\n", x,y);
        }

    for (int y=N-1; y>=k-1; y-- )
        for (int x=0; x<N; x++ )
        {
            int contador = 0;

            if(m[x][y] == s[0])
                for(int q =0; q<k; q++)
                {
                    if(s[q]== m[x][y-q])
                        contador++;
                }

            if(contador==k)
                printf("(%d,%d) sentido: diretia para esquerda\n", x,y);
        }

    for (int x=0; x<=N-k; x++ )
        for (int y=0; y<N; y++ )
        {
            int contador = 0;

            if(m[x][y] == s[0])
                for(int q =0; q<k; q++)
                {
                    if(s[q]== m[x+q][y])
                        contador++;
                }

            if(contador==k)
                printf("(%d,%d) sentido: cima para baixo\n", x,y);
        }


    for (int x=N-1; x>=k-1; x-- )
        for (int y=0; y<N; y++ )
        {
            int contador = 0;

            if(m[x][y] == s[0])
                for(int q =0; q<k; q++)
                {
                    if(s[q]== m[x-q][y])
                        contador++;
                }

            if(contador==k)
                printf("(%d,%d) sentido: baixo para cima\n", x,y);
        }

}
