#include <stdio.h>

int main()
{
    double x, n, xrad, senx, dividendo, divisor;
    int expoente, numFatorial;

    printf("Digite o valor do de x: ");
    scanf("%lf", &x);

    printf("Digite o valor do de n: ");
    scanf("%lf", &n);

    while (x < 0 || n <= 0)
    {
        printf("Digite o valor do de x: ");
        scanf("%lf", &x);

        printf("Digite o valor do de n: ");
        scanf("%lf", &n);
    };

    xrad = x * 3.14159 / 180;

    for (int i = 0; i < n; i++)
    {
        expoente = 2 * i + 1;
        numFatorial = expoente;
        dividendo = 1;
        divisor = 1;

        while (numFatorial > 1)
        {
            divisor *= numFatorial * (numFatorial - 1);
            numFatorial = numFatorial - 2;
        };

        while (expoente > 0)
        {
            dividendo *= xrad;
            expoente--;
        };

        if (i%2 == 0)
        {
            senx += dividendo / divisor;
        }
        else
        {
            senx -= dividendo / divisor;
        }
    }

    printf("%.8lf", senx);
}

