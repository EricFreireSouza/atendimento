import React from 'react';
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import FirebaseService from "../../services/FirebaseService";
import { privateUrls } from "../../utils/urlUtils";
import { Menu } from "../../components/Menu/Menu";

export const DataTable = ({data}) => {
    const remove = (id) => {
        FirebaseService.remove(id, 'leituras');
    };

    return <React.Fragment>
        <Menu />
        <Typography variant="headline" component="h2">Cadastro de Atendimento</Typography>
        <Table selectable="false">
            <TableHead>
                <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>CPF</TableCell>
                    <TableCell>Matrícula</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell>{item.key}</TableCell>
                            <TableCell>{item.nome}</TableCell>
                            <TableCell>{item.cpf}</TableCell>
                            <TableCell>{item.matricula}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                <Button  
                                    variant="contained" 
                                    component={
                                        props => <Link to={privateUrls.edit.pathWithouParam + item.key} 
                                        {...props}/>
                                    }
                                >
                                    Editar
                                </Button>

                                <Button  
                                    variant="contained"
                                    onClick={() => remove(item.key)}
                                >
                                    Remover
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </React.Fragment>
};