const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {

    before(async () => {
        this.tasksContract = await TasksContract.deployed()
    });

    it('migrate deployed successfully', async () => {
        const address = this.tasksContract.address
        
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, 0x0)
        assert.notEqual(address, "")
    });

    it('get Tasks list', async () => {
        const tasksCounter = await this.tasksContract.taskCounter()
        const task = await this.tasksContract.tasks(tasksCounter)
       
        assert.equal(task.id.toNumber(), tasksCounter);
        assert.equal(task.title, 'Mi primera tarea de ejemplo');
        assert.equal(task.description, 'Tengo que hacer algo');
        assert.equal(task.done, false);
        assert.equal(tasksCounter, 1);  
    });

    it('task createad successfully', async () => {
        const result = await this.tasksContract.createTask("some task", "description two")
        const taskEvent = result.logs[0].args;
        const taskCounter = await this.tasksContract.taskCounter();
        
        assert.equal(taskCounter, 2);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, 'some task');
        assert.equal(taskEvent.description, 'description two');
        assert.equal(taskEvent.done, false);
    });

    it('task toggle done', async () => {
        const result = await this.tasksContract.toggleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.tasksContract.tasks(1);

        assert.equal(task.done, true);
        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);
    });

})