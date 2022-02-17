#include <stdio.h>

int main(void)
{
    int k;
    char tipo;
    long long int resultado;

    printf("Digite o valor de k: ");
    scanf("%d", &k);
    getchar();
    printf("Digite o valor P para resultado triangular par e I para triangular impar: ");
    scanf("%c", &tipo);

    if(tipo == 'P')
    {
        for(int i = 1; i<=k; i++)
        {
            resultado = i*2 * (i+1)*2 * (i+2)*2;
            printf("%d\n", resultado);
        };
    }
    else if (tipo == 'I')
    {
        for(int i = 0; i<=k; i++)
        {
            resultado = (i*2+1) * (i*2+3) * (i*2+5);
            printf("%d\n", resultado);
        };
    }
    else
    {
        getchar();
        printf("Digite o valor P para resultado triangular par e I para triangular impar: ");
        scanf("%c", &tipo);
    }
}
